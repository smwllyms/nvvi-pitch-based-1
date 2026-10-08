import * as React from "react";
import { Blurb } from "../components/Blurb/Blurb";
import { Title } from "../components/Title/Title";
import { WizardStage, WizardStageComponentProps } from "../components/Wizard";
import { NvviWizardState } from "./types";
import { Italic } from "../components/Italic/Italic";

export const ToolPrototypeComponent = (props: WizardStageComponentProps<NvviWizardState>): React.JSX.Element => {

  return (<>
    <Title>Our Tool - Prototype</Title>
    <Blurb>
      You can toggle the tool on and off by creating 2 transients in a short time (e.g. clapping twice). The status will be displayed as ON or OFF.
    </Blurb>
    <Blurb>
      <span>
        When first turned on, you will see that the tool is <Italic>listening</Italic> for a pitch. Once it confidently detects one, a <Italic>session</Italic> will begin, and you will see the detected pitch of your whistling/humming and the <Italic>offset</Italic> of your session (the change of pitch since the session began). During this time, any modulation of your pitch, i.e. up and down, will be used to control a parameter.
      </span>
    </Blurb>
    <Blurb>
      <span>
        When the tool loses <Italic>confidence</Italic> (e.g. you stop whistling/humming), it will go back to the listening stage and the <Italic>session</Italic> will end.
      </span>
    </Blurb>
    <Blurb>
      This information will be available for your convenience when you click/tap the "Help" menu item above. 
    </Blurb>
  </>
  )
}

export const buildToolPrototypeStage = (): WizardStage<NvviWizardState> => {
  return {
    component: ToolPrototypeComponent,
    onStart: currentWizardState => currentWizardState.setShowHelpMenuItem(true),
    initiallyLocked: () => false
  }
}