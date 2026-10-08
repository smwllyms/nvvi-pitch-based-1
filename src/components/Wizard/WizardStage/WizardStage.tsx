import { WizardComponentRef, WizardStageProgress, WizardStage as WizardStateType } from "../types";
import * as React from "react";

export interface WizardStageProps<WizardStateT> {
  stageData: WizardStateType<WizardStateT>;
  wizardStateRef: React.RefObject<WizardStateT>;
  wizardComponentRef: WizardComponentRef<WizardStateT>;
  currentWizardStageProgressRef: WizardStageProgress;
  setCurrentWizardStageProgressRef: (ref: WizardStageProgress) => void;
}
export const WizardStage = <WizardStateT,>({
  stageData,
  wizardStateRef,
  wizardComponentRef,
  currentWizardStageProgressRef,
  setCurrentWizardStageProgressRef
}: WizardStageProps<WizardStateT>): React.JSX.Element => {

  const rootElemRef = React.useRef<HTMLDivElement>(null);
  const mountedRef = React.useRef<boolean>(false);
  const [isLocked, setIsLocked] = React.useState<boolean>(() => !!stageData.initiallyLocked(
    wizardComponentRef?.getProgress(), wizardStateRef.current));

  React.useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    const started = !!currentWizardStageProgressRef;
    const newRef: WizardStageProgress = {
      isLocked: () => isLocked,
      setIsLocked,
      rootElemRef: rootElemRef
    }
    if (started) {
      stageData.onStart?.(wizardStateRef.current);
    }
    setCurrentWizardStageProgressRef(newRef);
    if (started && !isLocked) {
      stageData.onUnlock?.(wizardStateRef.current);
    }
  }, [rootElemRef, isLocked, !!currentWizardStageProgressRef]);

  const StageComponent = stageData.component;

  return (
    <>
      {StageComponent({
        rootElemRef,
        wizardStateRef,
        wizardComponentRef
      })}
    </>
  )
}