import { NvviPitchControllerState } from "../nvvi-tool/messages";

export enum ResetStageMode {
  TIMER = "TIMER"
}
export interface ResetStageFnResultBase {
  mode: ResetStageMode
}
export interface ResetStageFnResultTimer {
  mode: ResetStageMode.TIMER,
  time: number;
}
export type ResetStageFnResult = ResetStageFnResultTimer;

export interface NvviWizardState {
  resetStage: (fn?: () => ResetStageFnResult) => void;
  setShowHelpMenuItem: (value: boolean) => void;
  getLastEventState: () => NvviPitchControllerState;
  initializeNvvi: () => Promise<Error>;
  setUseTransientToggle: (value: boolean) => void;
  destroyNvvi: () => Promise<void>;
  setNvviToolEnabled: (value: boolean) => void;
}