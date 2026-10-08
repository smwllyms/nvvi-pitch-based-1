import * as React from "react";
import { WizardStage, WizardStageComponentProps } from "../components/Wizard";
import { NvviWizardState } from "./types";
import { Questionnaire } from "../components/Questionnaire/Questionnaire";
import { Surveys } from "../questionnaire";

const questionnaire = Surveys.PRE_SURVEY;

const PreSurveyComponent = (props: WizardStageComponentProps<NvviWizardState>): React.JSX.Element => {

  const onQuestionnaireChange = (allValid: boolean, values: Record<string, any>): void => {
    if (allValid) {
      props.wizardComponentRef.setIsCurrentStageLocked(false);
    } else {
      props.wizardComponentRef.setIsCurrentStageLocked(true);
    }
  }

  return (
    <Questionnaire
      onChange={onQuestionnaireChange}
      questionnaire={questionnaire}
    />
  )
}

export const buildPreSurveyStage = (): WizardStage<NvviWizardState> => {
  return {
    component: PreSurveyComponent,
    initiallyLocked: () => true
  }
}