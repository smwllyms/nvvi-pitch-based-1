import * as React from "react";
import {
  QuestionType,
  QuestionSchema,
  QuestionListSchema
} from "../../questionnaire/types";
import { InvalidQuestionStyles } from "./Question.css";
import { Blurb } from "../Blurb/Blurb";

interface QuestionProps {
  question: QuestionSchema | QuestionListSchema;
  defaultValue?: any;
  onChange?: (value: any) => void;
  /**
   * User defined callback to validate the value
   * @param value The recently set value
   * @returns True if valid value, false otherwise
   */
  validate?: (value: any) => boolean;
}

export const Question = ({
  question,
  defaultValue,
  onChange,
  validate,
}: QuestionProps): React.JSX.Element => {

  const {
    id,
    label,
    type,
    required = false
  } = question;

  const [isValid, setIsValid] = React.useState<boolean>(true);

  const internalValidator = (value: any): void => {
    if (required && !value) {
      setIsValid(false);
    } else if (validate) {
      setIsValid(validate(value));
    } else {
      setIsValid(true);
    }
  }

  const handleValueChanged = (value: any): void => {
    onChange(value);
    internalValidator(value);
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleValueChanged(e.target.value);
  };

  const handleListChange = (optionValue: string) => {
    handleValueChanged(optionValue);
  };

  const handleLikertChange = (numericValue: number) => {
    handleValueChanged(numericValue);
  };

  React.useEffect(() => { internalValidator(defaultValue); }, []);

  return (
    <div>
      <Blurb>
        <span style={!isValid ? InvalidQuestionStyles : undefined}>
          {label}{!isValid && "*"}
        </span>
      </Blurb>
      {type === QuestionType.TEXTAREA && (
        <textarea
          defaultValue={defaultValue ?? ""}
          onChange={handleTextareaChange}
        />
      )}

      {type === QuestionType.LIST && (
        <>
          {(question as QuestionListSchema).options?.map((option, idx) => {
            const label = typeof option === "string" ? option : option.label;
            const value = typeof option === "string" ? option : option.value;
            const isInitialChecked = defaultValue === value;
            return (
              <p key={idx}>
                <input
                  type="radio"
                  name={id}
                  defaultChecked={isInitialChecked}
                  onChange={e => handleListChange(value)}
                  multiple={(question as QuestionListSchema).multiple}
                />
                <span>{label}</span>
              </p>
            );
          })}
        </>
      )}

      {type === QuestionType.LIKERT && (
        <>
          <p>
            {type === QuestionType.LIKERT ? `Rate your agreement with the following statement: ${label}` : label}
          </p>
          {[
            "Strongly Disagree",
            "Disagree",
            "Neither Agree or Disagree",
            "Agree",
            "Strongly Agree",
          ].map((optionLabel, idx) => {
            const isInitialChecked = defaultValue === idx;
            return (
              <p key={idx} style={{ marginBottom: "0px", marginTop: "2px" }}>
                <input
                  type="radio"
                  name={id}
                  defaultChecked={isInitialChecked}
                  onChange={() => handleLikertChange(idx)}
                />
                <span>{optionLabel}</span>
              </p>
            );
          })}
        </>
      )}
    </div>
  );
};