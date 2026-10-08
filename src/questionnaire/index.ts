import { QuestionnaireSchema } from "./types";
import presurvey from"./surveys/pre-survey.json";

enum SurveyNames {
  PRE_SURVEY = "PRE_SURVEY"
}
export const Surveys: Record<SurveyNames, QuestionnaireSchema> = {
  [SurveyNames.PRE_SURVEY]: presurvey as QuestionnaireSchema
}