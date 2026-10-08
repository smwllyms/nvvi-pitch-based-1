import * as React from "react";
import { Blurb } from "../components/Blurb/Blurb";
import { Title } from "../components/Title/Title";
import { WizardStage, WizardStageComponentProps } from "../components/Wizard";
import { NvviWizardState } from "./types";
import { Icon } from "../components/Icon/Icon";
import { Italic } from "../components/Italic/Italic";

const SelectionHandlingComponent = (props: WizardStageComponentProps<NvviWizardState>): React.JSX.Element => {

  return (<>
    <Title>How Our Tool Handles Selection</Title>
    <Blurb>
      <span>
        To specify when to activate our NVVI tool's pitch detection, we've decided that <Italic>transient detection</Italic> will be the method of choice. In short, <Italic>transient detection</Italic> means the detection of some abrupt and atypically loud impulse in the audio signal.
      </span>
    </Blurb>
    <div style={{ display: "inline-flex" }}>
      <Icon iconName="wifi_tethering_error_rounded" />
      <Icon iconName="wifi_tethering_error_rounded" />
      <Icon iconName="hearing" />
    </div>
    <Blurb>
      <span>
        Our tool interprets <Italic>TWO TRANSIENTS</Italic> as a signal to toggle the tool on and off. For example, you can do this by clapping your hands twice consecutively near the microphone! Listen to the demo below.
      </span>
    </Blurb>
    <audio controls>
      <source src="claptwice.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  </>
  )
}

export const buildSelectionHandlingStage = (): WizardStage<NvviWizardState> => {
  return {
    component: SelectionHandlingComponent,
    initiallyLocked: () => false
  }
}