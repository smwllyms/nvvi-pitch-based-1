import * as React from "react";
import { Blurb } from "../components/Blurb/Blurb";
import { Title } from "../components/Title/Title";
import { WizardStage, WizardStageComponentProps } from "../components/Wizard";
import { NvviWizardState } from "./types";
import { VideoPlayer } from "../components/VideoPlayer/VideoPlayer";

export const ToolDemoComponent = (props: WizardStageComponentProps<NvviWizardState>): React.JSX.Element => {

  return (<>
    <Title>Our Tool - Video Demo</Title>
    <Blurb>
      Below is a video showcasing how to use the NVVI tool with both whistling and humming.
    </Blurb>
    <VideoPlayer
      controls
      source="tool-demo.mp4"
      videoType="video/mp4"
    />
  </>
  )
}

export const buildToolDemoStage = (): WizardStage<NvviWizardState> => {
  return {
    component: ToolDemoComponent,
    initiallyLocked: () => false
  }
}