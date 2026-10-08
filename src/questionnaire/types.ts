
export interface QuestionnaireSchema {
  title: string;
  description?: string;
  questions: Array<QuestionSchema>;
}

export enum QuestionType {
  LIST = "LIST",
  LIKERT = "LIKERT",
  TEXTAREA = "TEXTAREA"
}
export interface QuestionSchema {
  id: string;
  label: string;
  type: QuestionType;
  required?: boolean;
}

export interface QuestionListOption {
  label: string;
  value: string;
}
export interface QuestionListSchema extends QuestionSchema {
  type: QuestionType.LIST;
  options: Array<QuestionListOption | string>;
  defaultValue?: QuestionListOption | string;
  multiple?: boolean;
}