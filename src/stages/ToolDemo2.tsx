import * as React from "react";
import { Blurb } from "../components/Blurb/Blurb";
import { Title } from "../components/Title/Title";
import { WizardStage, WizardStageComponentProps } from "../components/Wizard";
import { NvviWizardState } from "./types";
import { NvviTool } from "../components/NvviTool/NvviTool";

export const ToolDemo2Component = (props: WizardStageComponentProps<NvviWizardState>): React.JSX.Element => {

  return (<>
    <Title>Our Tool - Live Demo</Title>
    <Blurb>
      You may practice with the tool below. When ready you may proceed to the presurvey.
    </Blurb>
    <NvviTool getNvviToolState={props.wizardStateRef.current.getLastEventState} />
  </>
  )
}

export const buildToolDemo2Stage = (): WizardStage<NvviWizardState> => {
  return {
    component: ToolDemo2Component,
    onStart: async currentWizardState => {
      await currentWizardState.destroyNvvi();
      currentWizardState.setUseTransientToggle(true);
      await currentWizardState.initializeNvvi();
      currentWizardState.setNvviToolEnabled(true);
    },
    initiallyLocked: () => false
  }
}