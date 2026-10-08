import { Session } from "./session";
import { Report } from "./report";
import { parseCurrentDirectory } from "./helpers";
import { NvviAudioWorkletEvent, NvviPitchControllerState } from "./messages";

import processorSource from "./audio-analyzer.worklet.js?raw";

const TRANSIENT_WINDOW_TIME = 370;
const PROCESSING_RATE = 512;
const MAX_CONFIDENCE_MISSES = 1;
const SMOOTHNESS = 60;
const WEIGHT_MULTIPLIER = 1.0;
const MIN_CONFIDENCE_FOR_SESSION = 0.7;
const SAMPLE_RATE = 44100.0;
const FRAME_SIZE = 1024;

export enum ProcessingMode {
  ACF = "ACF",
  EXP = "EXP",
  HPS = "HPS"
}

interface PitchControllerArgs {
  processingMode?: ProcessingMode;
  smoothness?: number;
  precision?: number;
  transientWindowTime?: number;
  sampleRate?: number;
  processingRate?: number;
  maxConfidenceMisses?: number;
  minConfidenceForSession?: number;
  weightMultiplier?: number;
  useTransientToggle?: boolean;
  onAfterProcessing?: (e: NvviAudioWorkletEvent) => void;
  frameSize?: number;
}
export class PitchController {
  // Internal
  enabled: boolean = false;
  initialized: boolean = false;
  pitchControllerDirectory: string;
  analyzer: AudioWorkletNode;

  // Configuration
  transientWindowTime: number;
  sampleRate: number;
  processingRate: number;
  frameSize: number;
  useTransientToggle: boolean;
  weightMultiplier: number;
  processingMode: ProcessingMode;
  precision: number;
  smoothness: number;
  boostAmount: number;
  afterProcessing?: (e: NvviAudioWorkletEvent) => void;

  // Confidence
  maxConfidenceMisses: number;
  currentConfidenceMisses: number = 0;

  // Session
  session: Session = null;
  inSession: boolean = false; // Meaning a pitch has been detected
  minConfidenceForSession: number;

  // Reports
  lastReports: Array<Report>;
  lastEventState?: NvviPitchControllerState;

  // Web audio API-related
  audioContext: AudioContext;
  inGain: GainNode;
  stream: MediaStream;

  constructor(parameters: PitchControllerArgs) {

    // See audio analyzer for explanations on these
    this.processingMode = parameters.processingMode || ProcessingMode.EXP;
    this.smoothness = parameters.smoothness || SMOOTHNESS;
    this.precision = parameters.precision || 0;
    this.transientWindowTime = parameters.transientWindowTime || TRANSIENT_WINDOW_TIME;
    this.sampleRate = parameters.sampleRate || SAMPLE_RATE;
    this.processingRate = parameters.processingRate || PROCESSING_RATE;
    this.frameSize = parameters.frameSize || FRAME_SIZE;

    // # of confidence misses to end session
    this.maxConfidenceMisses = parameters.maxConfidenceMisses || MAX_CONFIDENCE_MISSES;
    this.currentConfidenceMisses = 0;

    // Weight to multiply by
    this.weightMultiplier = parameters.weightMultiplier || WEIGHT_MULTIPLIER;

    // Use transient detection for enabled/disabled
    this.useTransientToggle = parameters.useTransientToggle || true;

    // The minimum confience level to be in a session
    this.minConfidenceForSession = parameters.minConfidenceForSession || MIN_CONFIDENCE_FOR_SESSION;
  }

  setBoost(amt: number) {
    if (!this.initialized) {
      return;
    }
    this.boostAmount = amt;
    this.inGain.gain.value = amt;
  }

  private postMessage(msg: unknown): boolean {
    if (!this.initialized) {
      return false;
    }
    if (!this.analyzer?.port?.postMessage) {
      return false;
    }
    this.analyzer.port.postMessage(msg);
    return true;
  }

  setUseTransientToggle(val: boolean) {
    this.useTransientToggle = val;
    this.postMessage({ useTransientToggle: val });
  }

  isInRunningState() {
    // Only return true if user enabled and initialized
    return this.enabled && this.initialized;
  }

  async initialize(): Promise<Error> {

    // Check to make sure we are not initialized
    if (this.initialized) {
      await this.destroy();
    }

    const scope = this;
    this.lastReports = [];
    this.lastEventState = null;

    try {
      // Set our constraints
      // Note we don't want a lot of these features because they interfere with our
      // processing
      const constraints = {
        audio: {
          echoCancellation: false,
          noiseSuppression: true,
          autoGainControl: false
        }
      };

      // Get user input from microphone
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      scope.stream = stream;
      // Create an audio context
      const audioContext = new AudioContext({ sampleRate: scope.sampleRate });

      // Create audio source from input stream
      const audioSource = audioContext.createMediaStreamSource(stream);

      // Connect input to a bandpass filter (50 - 1000 Hz)
      const from = 50;
      const to = 1000;
      const geometricMean = Math.sqrt(from * to);

      const inGain = audioContext.createGain();
      inGain.gain.value = 1.0;
      scope.inGain = inGain;

      const bandpass = audioContext.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.value = 160;
      bandpass.Q.value = 1.0; // ?
      // bandpass.frequency.value = geometricMean;
      // bandpass.Q.value = geometricMean / (to - from);
      // bandpass.type = 'lowpass';
      // bandpass.frequency.value = 2000;

      inGain.connect(bandpass);
      audioSource.connect(inGain);

      // Connect input to an analyser
      let blob = new Blob([processorSource], { type: "application/javascript" });
      let workletUrl = URL.createObjectURL(blob);
      await audioContext.audioWorklet.addModule(workletUrl);
      const analyzer = new AudioWorkletNode(audioContext, "worklet-analyzer", {
        processorOptions: {
          sampleRate: audioContext.sampleRate,
          frameSize: scope.frameSize,
          mode: scope.processingMode,
          smoothness: scope.smoothness,
          precision: scope.precision,
          transientWindowTime: scope.transientWindowTime,
          processingRate: scope.processingRate
        }
      });
      bandpass.connect(analyzer);

      audioContext.resume();
      scope.audioContext = audioContext;

      // Setup callbacks
      analyzer.port.onmessage = e => {
        scope._callback(e);
      }

      // Set initial enabled state in analyzer
      analyzer.port.postMessage({ enabled: scope.isInRunningState() });
      analyzer.port.postMessage({ useTransientToggle: scope.useTransientToggle });

      // Initialized
      scope.analyzer = analyzer;
      scope.initialized = true;
      scope.inSession = false;
      scope.session = null;

    } catch (e) {
      console.error(e);
      return e;
    }
  }

  setEnabled(val?: boolean) {
    if (val === undefined) {
      val = !this.enabled;
    }

    this.enabled = val;

    this.postMessage({ enabled: this.isInRunningState() })
  }

  getLastEventState(): NvviPitchControllerState { return this.lastEventState; }

  _callback(e: NvviAudioWorkletEvent) {

    e.data.initialized = this.initialized;
    e.data.enabled = this.enabled;

    if ("shutdown" in e.data) {

      e.data.shutdown = true;

      if (this.afterProcessing) {
        this.afterProcessing(e);
      }

      this.onDestroy();
      return;
    }

    // In this function, we handle the callback to perform a variety of checks
    // Check for silence
    if ("transientSilence" in e.data) {
      // Let consumer decide what to do
    }

    if ("pitchInfo" in e.data) {

      let isValid = this.isInRunningState() && !isNaN(e.data.pitchInfo.pitch);
      let report = e.data;

      if (e.data.pitchInfo.confidence >= this.minConfidenceForSession) {
        this.currentConfidenceMisses = 0;
      }
      else {
        this.currentConfidenceMisses++;
      }
      // Check if confidence misses
      if (this.currentConfidenceMisses == this.maxConfidenceMisses) {
        isValid = false;
      }

      let smoothedPitch = report.pitchInfo.pitch;
      let smoothedConfidence = report.pitchInfo.confidence;

      if (this.lastReports.length == 0 && this.smoothness != 0) {
        for (let i = 0; i < this.smoothness; i++) {
          this.lastReports[i] = new Report({
            pitch: report.pitchInfo.pitch,
            confidence: report.pitchInfo.confidence
          });
        }
      }
      for (let i = 0; i < this.lastReports.length; i++) {
        smoothedPitch += this.lastReports[i].pitch;
        smoothedConfidence += this.lastReports[i].confidence;
      }

      smoothedPitch /= this.lastReports.length + 1;
      smoothedPitch = Math.round(smoothedPitch);
      smoothedConfidence /= this.lastReports.length + 1;

      this.lastReports.shift();
      this.lastReports.push(new Report({
        pitch: report.pitchInfo.pitch,
        confidence: report.pitchInfo.confidence
      }));

      // Check confidence
      if (isValid && smoothedConfidence >= this.minConfidenceForSession) {
        if (!this.inSession) {
          // Not in session so make one, as confidence is adequate
          this.inSession = true;

          // Create a session
          this.session = new Session({ initialPitch: report.pitchInfo.pitch });

          this.lastReports = [];
          for (let i = 0; i < this.smoothness; i++) {
            this.lastReports.push(new Report({
              pitch: report.pitchInfo.pitch,
              confidence: report.pitchInfo.confidence
            }));
          }

          this.currentConfidenceMisses = 0;
        }
        else {
          // Update our current session
          this.session.update(smoothedPitch, 1.0);
        }
        e.data.session = this.session;
      }
      else {
        if (this.inSession) {
          // We are in session and confidence is too low! Terminate it
          this.inSession = false;

          // Delete session
          this.session = null;
        }
      }
    }

    // Set final vals
    e.data.inSession = this.inSession;

    if (e.data.session === undefined) {
      e.data.session = null;
    }

    // Callback
    if (this.afterProcessing) {
      this.afterProcessing(e);
    }
    this.lastEventState = e.data;
  }

  setAfterProcessingCallback(callback) {
    this.afterProcessing = callback;
  }

  async destroy() {
    this.postMessage({ shutdown: true });

    let scope = this;
    await new Promise(resolve => {
      let checkIfDestroyed = setInterval(() => {
        if (!scope.initialized) {
          clearInterval(checkIfDestroyed);
          resolve(null);
        }
      }, 20);
    })
  }

  async onDestroy() {
    try {
      this.stream.getTracks().forEach((track) => track.stop())
      await this.audioContext.close();
    } catch (e) {
      console.error("Error closing audio context: " + e?.toString())
    }

    this.initialized = false;
  }
}