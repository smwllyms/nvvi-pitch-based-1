import * as React from "react";
import { Blurb } from "../components/Blurb/Blurb";
import { Title } from "../components/Title/Title";
import { WizardStage, WizardStageComponentProps } from "../components/Wizard";
import { NvviWizardState } from "./types";
import { NvviTool } from "../components/NvviTool/NvviTool";

const IntroPitchComponent = (props: WizardStageComponentProps<NvviWizardState>): React.JSX.Element => {

  return (<>
    <Title>Pitch Please?</Title>
    <Blurb>
      One aspect of NVVI is pitch produced by humming and whistling. This form of NVVI will be used in this study. For example, see the visual below!
    </Blurb>
    <NvviTool getNvviToolState={props.wizardStateRef?.current?.getLastEventState} />
    <Blurb>
      There is an audio process running in the background right now that is continuously monitoring your pitch. The detected pitch (if it is detected at all) is displayed above.
    </Blurb>
    <Blurb>
      Try whistling or humming and see what happens!
    </Blurb>
  </>
  )
}

export const buildIntroPitchStage = (): WizardStage<NvviWizardState> => {
  return {
    component: IntroPitchComponent,
    initiallyLocked: () => false,
    onStart: async initialWizardState => {
      await initialWizardState.setUseTransientToggle(false);
      await initialWizardState.initializeNvvi();
      await initialWizardState.setNvviToolEnabled(true);
    },
    onUnlock: initialWizardState => initialWizardState.destroyNvvi()
  }
}