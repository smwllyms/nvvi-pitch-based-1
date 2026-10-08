import { WizardStage, WizardStageComponentProps } from "../components/Wizard";
import { NvviWizardState } from "./types";
import { buildWelcomeStage } from "./Welcome";
import { buildIntroductionStage } from "./Introduction";
import { buildIntroduction2Stage } from "./Introduction2";
import { buildConsentStage } from "./Consent";
import { buildAccessMicStage } from "./AccessMic";
import { buildIntroPitchStage } from "./IntroPitch";
import { buildToolOverviewStage } from "./ToolOverview";
import { buildSelectionHandlingStage } from "./SelectionHandling";
import { buildToolPrototypeStage } from "./ToolPrototype";
import { buildToolDemoStage } from "./ToolDemo";
import { buildToolDemo2Stage } from "./ToolDemo2";
import { buildPreSurveyStage } from "./PreSurvey";
import { buildWIPStage } from "./WIP";
export const BuildStages = (): Array<WizardStage<NvviWizardState>> => [
  // buildToolDemo2Stage(),
  buildWelcomeStage(),
  buildIntroductionStage(),
  buildIntroduction2Stage(),
  buildConsentStage(),
  buildAccessMicStage(),
  buildIntroPitchStage(),
  buildToolOverviewStage(),
  buildSelectionHandlingStage(),
  buildToolPrototypeStage(),
  buildToolDemoStage(),
  buildToolDemo2Stage(),
  buildWIPStage()
  // buildPreSurveyStage()
]