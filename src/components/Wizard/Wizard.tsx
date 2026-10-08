import * as React from "react";
import { WizardStyles } from "./Wizard.css";
import {
  WizardComponentRef,
  WizardProgress,
  WizardStageProgress,
  WizardStage as WizardStageType
} from "./types";
import { WizardStage } from "./WizardStage/WizardStage";

interface WizardProps<WizardStateT extends {}> {
  initialState?: WizardStateT;
  initialProgress?: WizardProgress;
  stages: WizardStageType<WizardStateT>[];
  containerStyles?: React.CSSProperties;
  setWizardComponentRef?: (ref?: WizardComponentRef<WizardStateT>) => void;
  onStart?: () => void;
  onProgress?: (progress: WizardProgress, nextStage: WizardStageType<WizardStateT>, currentStateRef: React.RefObject<WizardStateT>) => void;
  onComplete?: (finalState: WizardStateT) => void;
}
export const Wizard = <WizardStateT,>({
  stages,
  initialState,
  initialProgress,
  containerStyles,
  setWizardComponentRef: setConsumerRef,
  onStart,
  onProgress,
  onComplete
}: WizardProps<WizardStateT>): React.JSX.Element => {

  const [currentStageNumber, setCurrentStageNumber] = React.useState<number>(
    initialProgress?.currentStageNumber || 0
  );
  const wizardStateRef = React.useRef<WizardStateT>(initialState);

  const [wizardComponentRef, setWizardComponentRef] = React.useState<WizardComponentRef<WizardStateT>>();
  const [currentWizardStageProgressRef, setCurrentWizardStageProgressRef]
    = React.useState<WizardStageProgress>();

  const progress = React.useMemo<WizardProgress>((): WizardProgress => ({
    currentStageNumber,
    totalNumberOfStages: stages.length,
    currentWizardStageProgress: currentWizardStageProgressRef
  }), [currentStageNumber, currentWizardStageProgressRef]);

  const setNavigation = (location: number) => {
    if (location < 0 || location >= stages.length ||
      (location === currentStageNumber && progress.currentWizardStageProgress?.isLocked()) ||
      (location > currentStageNumber + 1 && stages[location].initiallyLocked?.(
        progress, wizardStateRef?.current
      ))) {
      return false;
    } else {
      setCurrentStageNumber(location);
      setCurrentWizardStageProgressRef(undefined);
      return true;
    }
  }

  React.useEffect(() => {

    if (!currentWizardStageProgressRef) return;

    const newRef: WizardComponentRef<WizardStateT> = {
      getProgress: () => progress,
      setNavigation: navigateFn => setNavigation(navigateFn(progress)),
      setIsCurrentStageLocked: currentWizardStageProgressRef?.setIsLocked,
      wizardStateRef
    }
    setWizardComponentRef(newRef);
    setConsumerRef?.(newRef);

    if (currentStageNumber === 0) {
      onStart?.();
    }
    onProgress?.(progress, stages[currentStageNumber], wizardStateRef);
    if (currentStageNumber === stages.length) {
      onComplete?.(wizardStateRef?.current);
    }
  }, [currentStageNumber, currentWizardStageProgressRef, progress, wizardStateRef]);

  return (
    <div style={{ ...WizardStyles, ...containerStyles }}>
      {stages.map((stage, stageNumber) => stageNumber === currentStageNumber && (
        <WizardStage
          key={stageNumber}
          stageData={stage}
          wizardStateRef={wizardStateRef}
          currentWizardStageProgressRef={currentWizardStageProgressRef}
          setCurrentWizardStageProgressRef={setCurrentWizardStageProgressRef}
          wizardComponentRef={wizardComponentRef}
        />
      ))}
    </div>
  )
}