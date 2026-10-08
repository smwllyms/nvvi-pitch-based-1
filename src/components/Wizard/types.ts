import * as React from "react";

export type WizardBaseType = {};

export interface WizardComponentRef<WizardStateT = WizardBaseType> {
  getProgress: () => WizardProgress;
  wizardStateRef: React.RefObject<WizardStateT>;
  setIsCurrentStageLocked: (locked: boolean) => void;
  /**
   * Sets the navigation given the current progress.
   * @param navigateFn Returns the position to attempt to navigate to
   * @returns whether navigation is successful or not
   */
  setNavigation: (navigateFn: (currentProgress: WizardProgress) => number) => boolean;
}

export interface WizardStageComponentProps<WizardStateT = WizardBaseType> {
  wizardStateRef?: React.RefObject<WizardStateT>;
  rootElemRef?: React.Ref<HTMLDivElement>;
  wizardComponentRef?: WizardComponentRef<WizardStateT>;
}

export interface WizardStage<WizardStateT = WizardBaseType> {
  /**
   * Called when the stage begins
   * @param currentWizardState The current wizard state if provided
   * @returns void
   */
  onStart?: (currentWizardState?: WizardStateT) => void | Promise<unknown>;
  /**
   * Called when the stage completes, only runs if the stage is initially locked.
   * @param currentWizardState
   * @returns void
   */
  onUnlock?: (currentWizardState?: WizardStateT) => void | Promise<unknown>;
  component: (props: WizardStageComponentProps<WizardStateT>) => React.JSX.Element;
  initiallyLocked?: (progress: WizardProgress, state: WizardStateT) => boolean;
}

export interface WizardStageProgress {
  rootElemRef: React.RefObject<HTMLDivElement>;
  isLocked: () => boolean;
  setIsLocked: (value: boolean) => void;
}

export interface WizardProgress {
  currentStageNumber: number;
  currentWizardStageProgress: WizardStageProgress;
  totalNumberOfStages: number;
}