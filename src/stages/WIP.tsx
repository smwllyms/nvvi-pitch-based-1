import * as React from "react";
import { Icon } from "../components/Icon/Icon";
import { Blurb } from "../components/Blurb/Blurb";
import { Title } from "../components/Title/Title";
import { WizardStage, WizardStageComponentProps } from "../components/Wizard";
import { NvviWizardState } from "./types";
import { List } from "../components/List/List";

const WIPComponent = (props: WizardStageComponentProps<NvviWizardState>): React.JSX.Element => {

  return (<>
    <Title>WIP</Title>
    <Blurb>
      This project is still work in progress! Get some practice with the tool, soon a mock assessment will be available to test your humming and whistling skills! 
    </Blurb>
    <Icon iconName="construction" />
  </>
  )
}

export const buildWIPStage = (): WizardStage<NvviWizardState> => {
  return {
    component: WIPComponent,
    initiallyLocked: () => false
  }
}