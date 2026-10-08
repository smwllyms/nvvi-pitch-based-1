import * as React from "react";
import { Blurb } from "../components/Blurb/Blurb";
import { Title } from "../components/Title/Title";
import { WizardStage, WizardStageComponentProps } from "../components/Wizard";
import { NvviWizardState } from "./types";
import { Icon } from "../components/Icon/Icon";

const ToolOverviewComponent = (props: WizardStageComponentProps<NvviWizardState>): React.JSX.Element => {

  return (<>
    <Title>Tool Overview</Title>
    <Blurb>
      Our NVVI tool used in this study is a pitch-based tool that allows you to control parameters with the pitch of your humming/whistling/singing. Specifically, changing the pitch of whichever sound you produce up and down will translate into an increase and decrease of the parameter, respectively. However, there is an important design consideration we haven't considered yet.
    </Blurb>
    <Blurb>
      Let's imagine you have 2 different parameters. How do you know which one you want to manipulate? Or, let's imagine you are talking to someone while using our tool. You naturally produce pitch when you talk. How can you specify when you want/don't want to use pitch manipulation?
    </Blurb>
    <div style={{ display: "inline-flex" }}>
      <Icon iconName="trending_up" />
      <Icon iconName="question_mark" />
      <Icon iconName="trending_down" />
    </div>
  </>
  )
}

export const buildToolOverviewStage = (): WizardStage<NvviWizardState> => {
  return {
    component: ToolOverviewComponent,
    initiallyLocked: () => false
  }
}