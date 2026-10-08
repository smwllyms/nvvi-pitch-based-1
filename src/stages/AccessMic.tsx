import * as React from "react";
import { Icon } from "../components/Icon/Icon";
import { Blurb } from "../components/Blurb/Blurb";
import { Title } from "../components/Title/Title";
import { Italic } from "../components/Italic/Italic";
import { NvviWizardState } from "./types";
import { WizardStage, WizardStageComponentProps } from "../components/Wizard";
import { Styled } from "../components/Styled/Styled";
import { NvviTool } from "../components/NvviTool/NvviTool";
import { getUserMedia } from "../utils/getUserMedia";

const AccessMicBaseStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  padding: "10px",
  width: "100px",
  height: "100px",
  border: "2px solid black",
  borderRadius: "4px",
  backgroundColor: "white",
  cursor: "pointer"
}

const AccessMicHoverStyles: React.CSSProperties = {
  filter: "brightness(0.8)"
}

export const AccessMicComponent = (props: WizardStageComponentProps<NvviWizardState>): React.JSX.Element => {

  const [error, setError] = React.useState<string>();
  const [accessGranted, setAccessGranted] = React.useState<boolean>(false);

  const handleClick = async () => {
    setError(undefined);
    const result = await getUserMedia();
    if (!result) {
      props.wizardComponentRef?.setIsCurrentStageLocked(false);
      setAccessGranted(true);
    } else {
      setError(result.toString());
    }
  }

  return (<>
    <Title>What is NVVI?</Title>
    <Blurb>
      <span>
        <Italic>NVVI</Italic> (Non-verbal Vocal Interaction) is an interaction scheme that uses information from <Italic>non-speech</Italic> but still <Italic>vocal acoustics</Italic> as an input to a <Italic>controller</Italic> of sorts.
      </span>
    </Blurb>
    <Blurb>
      To use it for this study/demo, microphone access is required. You can provide the access to the microphone by clicking the button with the microphone image below and following the instructions. You may proceed after.
    </Blurb>
    {!accessGranted && (
      <Styled
        elemType={"a"}
        onClick={handleClick}
        style={AccessMicBaseStyles}
        hoverStyle={AccessMicHoverStyles}
      >
        <Icon iconName="keyboard_voice" />
        <span style={{ marginTop: "5px" }}>Allow</span>
      </Styled>
    )}
    {error && (
      <Blurb>
        <span style={{ color: "red" }}>{error}</span>
      </Blurb>
    )}
    {accessGranted && <Icon iconName="check" />}
  </>
  )
}

export const buildAccessMicStage = (): WizardStage<NvviWizardState> => {
  return {
    component: AccessMicComponent,
    initiallyLocked: () => true
  }
}