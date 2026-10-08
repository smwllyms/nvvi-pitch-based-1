import * as React from "react";
import { Wizard } from "./components/Wizard/Wizard";
import { Header } from "./components/Header/Header";
import { WizardComponentRef, WizardProgress, WizardStage } from "./components/Wizard";
import { BuildStages } from "./stages";
import { Footer } from "./components/Footer/Footer";
import { Button } from "./components/Button/Button";
import { NvviWizardState, ResetStageFnResult, ResetStageMode } from "./stages/types";
import { NvviWizardContainerStyles } from "./components/App.css";
import { useTimer } from "./utils/useTimer";
import { buildNvviPitchController, NvviPitchController } from "./nvvi-tool";
import { HelpDialog } from "./components/Dialog/Dialog";
import { ToolPrototypeComponent } from "./stages/ToolPrototype";

export const App = (): React.JSX.Element => {

  const stages = React.useMemo(() => BuildStages(), []);
  const [currentStage, setCurrentStage] = React.useState<number>();
  const [isCurrentStageLocked, setIsCurrentStageLocked] = React.useState<boolean>(false);
  const [wizardRef, setWizardRef] = React.useState<WizardComponentRef<NvviWizardState>>(null);
  const [showHelpMenuItem, setShowHelpMenuItem] = React.useState<boolean>(false);
  const [showHelpDialog, setShowHelpDialog] = React.useState<boolean>(false);

  const { start, done, timeRemainingInSeconds } = useTimer({
    callback: () => {
      setIsCurrentStageLocked(false);
    }
  });

  const nvviTool = React.useMemo((): NvviPitchController => buildNvviPitchController({}), []);
  nvviTool.setBoost(1.3)

  const onProgress = (
    progress: WizardProgress,
    currentStage: WizardStage<NvviWizardState>,
    state: React.RefObject<NvviWizardState>
  ): void => {
    setCurrentStage(progress.currentStageNumber);
    setIsCurrentStageLocked(progress.currentWizardStageProgress.isLocked());
  }

  const resetStage = (fn: () => ResetStageFnResult): void => {
    const result = fn?.();
    if (result?.mode === ResetStageMode.TIMER) {
      setIsCurrentStageLocked(true);
      start(result.time);
    } else {
      setIsCurrentStageLocked(false);
    }
  }

  return (
    <>
      {showHelpDialog && <HelpDialog
        content={<div style={NvviWizardContainerStyles}><ToolPrototypeComponent /></div>}
        handleClose={() => setShowHelpDialog(false)}
      />}
      <>
        <Header
          logoElement={<>NVVI</>}
          style={{ height: "12vh" }}
          navigationItems={[
            ...showHelpMenuItem ? [{ label: "Help", onClick: () => setShowHelpDialog(true) }] : [],
            { label: "Start over", onClick: () => wizardRef?.setNavigation(() => 0) },
            { label: "Visit my website", onClick: () => window.open("https://smwllyms.github.io", "_blank") }
          ]}
        />
        <div style={{ height: "76vh", width: "100%" }}>
          <Wizard
            stages={stages}
            setWizardComponentRef={setWizardRef}
            initialState={{
              resetStage,
              setShowHelpMenuItem,
              getLastEventState: nvviTool.getLastEventState.bind(nvviTool),
              initializeNvvi: nvviTool.initialize.bind(nvviTool),
              setUseTransientToggle: nvviTool.setUseTransientToggle.bind(nvviTool),
              destroyNvvi: nvviTool.destroy.bind(nvviTool),
              setNvviToolEnabled: nvviTool.setEnabled.bind(nvviTool)
            }}
            onProgress={onProgress}
            containerStyles={NvviWizardContainerStyles}
          />
        </div>
        <Footer style={{ height: "12vh" }}>
          <Button
            label="Back"
            onClick={() =>
              wizardRef?.setNavigation(progress => progress?.currentStageNumber - 1)}
            disabled={currentStage <= 0}
          />
          <span>{currentStage + 1}/{stages.length}</span>
          <Button
            label={done ? "Continue" : `Continue in ${timeRemainingInSeconds}...`}
            onClick={() =>
              wizardRef?.setNavigation(progress => progress?.currentStageNumber + 1)}
            disabled={isCurrentStageLocked || currentStage >= stages.length - 1}
          />
        </Footer>
      </>
    </>
  );
}