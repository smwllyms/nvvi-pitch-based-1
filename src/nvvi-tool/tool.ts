import { NvviAudioWorkletEvent, NvviPitchController } from "./index";
import { ProcessingMode } from "./pitch-controller";

interface BuildNvviPitchControllerProps {
  onAfterProcessing?: (e: NvviAudioWorkletEvent) => void;
}
export const buildNvviPitchController = ({ onAfterProcessing }: BuildNvviPitchControllerProps): NvviPitchController => {
  const frameSize = 1024;
  const sampleRate = 44100;
  const processingRate = 512;

  const controller = new NvviPitchController({
    frameSize: frameSize,
    sampleRate: sampleRate,
    onAfterProcessing: onAfterProcessing,
    processingMode: ProcessingMode.EXP,
    smoothness: 30,
    precision: 0,
    transientWindowTime: 370,
    minConfidenceForSession: 0.5,
    processingRate: processingRate,
    useTransientToggle: true
  });

  return controller;
}