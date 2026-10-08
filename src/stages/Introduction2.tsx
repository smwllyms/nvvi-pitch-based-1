

import * as React from "react";
import { Blurb } from "../components/Blurb/Blurb";
import { Title } from "../components/Title/Title";
import { WizardStage, WizardStageComponentProps } from "../components/Wizard";
import { NvviWizardState } from "./types";
import { Italic } from "../components/Italic/Italic";
import { Icon } from "../components/Icon/Icon";

const Introduction2Component = (props: WizardStageComponentProps<NvviWizardState>): React.JSX.Element => {

  return (<>
    <Title>Overview of a Pitch-based Implementation of NVVI</Title>
    <Blurb>
      Specifically, we will be exploring a pitch-based implementation of one approach to NVVI - modulating the pitch of the human voice to control a continuous one-dimensional input.
    </Blurb>
    <div style={{ display: "inline-flex" }}>
      <Icon iconName="music_note" />
      <Icon iconName="east" />
      <input type="range" />
    </div>
    <Blurb>
      For example, you may control an HTML slider like the one displayed above, but just think of a "parameter" as some value that can either increase or decrease. The pitch you produce can be analyzed as a numeric (continuous) value in Hertz. It that can then be determined if it is increasing or decreasing, which can also be used to control the parameter.
    </Blurb>
    <Blurb>
      <span>In this study, you will be assessed by using an NVVI tool to complete tasks. In short, you will be using the <Italic>pitch</Italic> of your <Italic>voice, whistle, or hum,</Italic> to control a <Italic>one-dimensional parameter</Italic>.</span>
    </Blurb>
  </>
  )
}

export const buildIntroduction2Stage = (): WizardStage<NvviWizardState> => {
  return {
    component: Introduction2Component,
    initiallyLocked: () => false
  }
}