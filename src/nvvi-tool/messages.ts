import { Report } from "./report";
import { Session } from "./session";

export interface NvviPitchControllerState {
  initialized: boolean;
  enabled: boolean;
  pitchInfo?: Report;
  inSession?: boolean;
  session?: Session;
  shutdown?: boolean;
  transientSilence?: boolean;
}

export interface NvviAudioWorkletEvent {
  data: NvviPitchControllerState;
}