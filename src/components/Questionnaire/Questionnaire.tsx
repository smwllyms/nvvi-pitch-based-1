import * as React from "react";
import { QuestionnaireSchema } from "../../questionnaire/types";
import { Wizard, WizardComponentRef, WizardProgress, WizardStage } from "../Wizard";
import { QuestionSchema } from "../../questionnaire/types";
import { Question } from "../Question/Question";
import { Title } from "../Title/Title";
import { Blurb } from "../Blurb/Blurb";
import { Button } from "../Button/Button";

interface QuestionnaireProps {
  questionnaire: QuestionnaireSchema;
  onChange: (allAreValid: boolean, values: Record<string, any>) => void;
}
export const Questionnaire = ({
  questionnaire,
  onChange
}: QuestionnaireProps): React.JSX.Element => {

  const {
    title,
    description,
    questions
  } = questionnaire;

  const valueMap = React.useRef<Record<string, any>>({});

  React.useEffect(() => {
    questions.forEach(question => valueMap.current[question.id] = null);
  }, []);

  const [wizardComponentRef, setWizardComponentRef] = React.useState<WizardComponentRef>();

  const checkIfComplete = (): void => {
    let complete = true;
    for (const questionId of Object.keys(valueMap)) {
      if (valueMap.current[questionId] === null) {
        complete = false;
        break;
      }
    }
    onChange(complete, { ...valueMap.current });
  }

  const stages = questions.map((question: QuestionSchema): WizardStage => ({
    initiallyLocked: () => question.required,
    onStart: () => {
      if (!(question.required && !valueMap.current[question.id]))
        wizardComponentRef?.setIsCurrentStageLocked(false);
    },
    component: ({ wizardComponentRef: ref }) => <Question
      question={question}
      defaultValue={valueMap.current[question.id]}
      onChange={value => {
        if (value) {
          valueMap.current[question.id] = value;
          ref?.setIsCurrentStageLocked(false);
        } else {
          if (question.required) {
            valueMap.current[question.id] = null;
          } else {
            delete valueMap.current[question.id];
            ref?.setIsCurrentStageLocked(false);
          }
        }
        checkIfComplete();
      }}
    />
  }));

  const [isPrevDisabled, setIsPrevDisabled] = React.useState<boolean>(false);
  const [isNextDisabled, setIsNextDisabled] = React.useState<boolean>(false);
  const onProgress = (progress: WizardProgress): void => {
    const currentStageNumber = progress?.currentStageNumber;
    setIsPrevDisabled(currentStageNumber === 0);
    setIsNextDisabled(currentStageNumber === stages.length - 1
      || progress?.currentWizardStageProgress?.isLocked());
  }


  return (
    <div>
      <Title>{title}</Title>
      {description ? <Blurb>{description}</Blurb> : undefined}
      <Wizard
        stages={stages}
        setWizardComponentRef={setWizardComponentRef}
        onProgress={onProgress}
      />
      <div>
        <Button
          label="Previous"
          onClick={() => wizardComponentRef?.setNavigation(p => p.currentStageNumber - 1)}
          disabled={isPrevDisabled}
        />
        <Button
          label="Next"
          onClick={() => wizardComponentRef?.setNavigation(p => p.currentStageNumber + 1)}
          disabled={isNextDisabled}
        />
      </div>
    </div>
  );
}