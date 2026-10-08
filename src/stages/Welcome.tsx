import * as React from "react";
import { Icon } from "../components/Icon/Icon";
import { Blurb } from "../components/Blurb/Blurb";
import { Title } from "../components/Title/Title";
import { WizardStage, WizardStageComponentProps } from "../components/Wizard";
import { NvviWizardState } from "./types";
import { List } from "../components/List/List";

const WelcomeComponent = (props: WizardStageComponentProps<NvviWizardState>): React.JSX.Element => {

  return (<>
    <Title>Welcome!</Title>
    <Blurb>
      Welcome to an overview, demo, and mock study on non-verbal vocal interaction (NVVI). For a deeper look into the topic, study, and results, you can check out my thesis and related papers below:
    </Blurb>
    <Blurb>
      <List>
        <a href="https://vtechworks.lib.vt.edu/items/a03e8a5e-c5ab-44b6-803b-89504b6eae45">Thesis: Exploring the Usability of Non-verbal Vocal Interaction (NVVI) and a Pitch Based Implementation</a>
        <a href="https://dl.acm.org/doi/10.1007/978-3-031-60449-2_12">A Relative Pitch Based Approach to Non-verbal Vocal Interaction as a Continuous and One-Dimensional Controller (HCII 2024)</a>
        <a href="https://ieeexplore.ieee.org/document/10536216/">An Approach to Pitch Based Implementation of Non-verbal Vocal Interaction (NVVI)(IEEE 2024 NIDIT workshop)</a>
      </List>
    </Blurb>
    <Icon iconName="waving_hand" />
  </>
  )
}

export const buildWelcomeStage = (): WizardStage<NvviWizardState> => {
  return {
    component: WelcomeComponent,
    initiallyLocked: () => false
  }
}