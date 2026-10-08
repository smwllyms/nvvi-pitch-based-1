import * as React from "react";
import { Icon } from "../components/Icon/Icon";
import { Blurb } from "../components/Blurb/Blurb";
import { Title } from "../components/Title/Title";
import { WizardStage, WizardStageComponentProps } from "../components/Wizard";
import { NvviWizardState, ResetStageMode } from "./types";

const ConsentComponent = (props: WizardStageComponentProps<NvviWizardState>): React.JSX.Element => {

  React.useEffect(() => {
    props.wizardStateRef?.current?.resetStage(() => ({
      mode: ResetStageMode.TIMER,
      time: 5
    }))
  }, []);

  return (<>
    <Title>Mock Study Consent and Terms of Use</Title>
    <Blurb>
      <>
        This is a mock study and no data will be collected or retained. However, the data collected from your pitching, whistling, and other vocal acoustics will be processed and information like pitch will be extracted/calculated. Your data will not be sent to any external recipients nor saved in any capacity. However, it will be temporarily cached to provide charts and analysis of the data.
      </>
    </Blurb>
    <Icon iconName="history_edu" />
  </>
  )
}

export const buildConsentStage = (): WizardStage<NvviWizardState> => {
  return {
    component: ConsentComponent,
    initiallyLocked: () => true
  }
}