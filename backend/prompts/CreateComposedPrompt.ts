import { defaultContent } from "./DefaultPromptContents.js";
import {
  formatIntroduction,
  formatGuidelines,
  formatExamples,
} from "./Utils.js";

export function createComposedPrompt({
  introduction = defaultContent.introduction,
  guidelines = defaultContent.guidelines,
  examples = defaultContent.examples,
} = {}) {
  const introductionPrompt = formatIntroduction(introduction);
  const guidelinesPrompt = formatGuidelines(guidelines);
  const examplesPrompt = formatExamples(examples);

  const composedPrompt = [introductionPrompt, guidelinesPrompt, examplesPrompt]
    .filter(Boolean) // Removes any empty strings
    .join("\n\n");

  return composedPrompt;
}
