import { defaultContent } from "./DefaultPromptContents.js";
import {
  formatIntroduction,
  formatGuideline,
  formatExamples,
} from "./Utils.js";

export function createComposedPrompt({
  introduction,
  guideline,
  examples,
}: {
  introduction?: string;
  guideline?: string;
  examples?: { text: string }[];
} = {}) {
  const finalIntroduction = introduction || defaultContent.introduction;
  const finalGuideline = guideline || defaultContent.guideline;
  const finalExamples = examples?.length ? examples : defaultContent.examples;

  const introductionPrompt = formatIntroduction(finalIntroduction);
  const guidelinesPrompt = formatGuideline(finalGuideline);
  const examplesPrompt = formatExamples(finalExamples);

  const composedPrompt = [introductionPrompt, guidelinesPrompt, examplesPrompt]
    .filter(Boolean) // Removes any empty strings
    .join("\n\n");

  return composedPrompt;
}
