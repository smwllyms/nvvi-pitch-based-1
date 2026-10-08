import * as React from "react";
import { Icon } from "../components/Icon/Icon";
import { Blurb } from "../components/Blurb/Blurb";
import { Title } from "../components/Title/Title";
import { WizardStage, WizardStageComponentProps } from "../components/Wizard";
import { NvviWizardState } from "./types";
import { Italic } from "../components/Italic/Italic";

const IntroductionComponent = (props: WizardStageComponentProps<NvviWizardState>): React.JSX.Element => {

  return (<>
    <Title>An Overview on NVVI (Non-verbal Vocal Interaction)</Title>
    <Blurb>
      NVVI can be thought of as non-speech vocal interactions. Many vocal technologies today rely on speech (eg, speech to text/speech processing) that rely on language-specific inputs like verbal commands.
    </Blurb>
    <Blurb>
      However, people can produce much more than just speech with their voice, including humming, whistling, and other non-verbal acoustics (eg, tongue clicking). The aim of this work was to explore leveraging one particular direction of this relatively unexplored potential - a one-dimensional, continuous input control mechanism.
    </Blurb>
    <div style={{ display: "inline-flex" }}>
      <Icon iconName="record_voice_over" />
      <Icon iconName="east" />
      <Icon iconName="tune" />
    </div>
  </>
  )
}

export const buildIntroductionStage = (): WizardStage<NvviWizardState> => {
  return {
    component: IntroductionComponent,
    initiallyLocked: () => false
  }
}