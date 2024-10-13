// Function to format the introduction section
export function formatIntroduction(introduction: string) {
  return `<Introduction>
  ${introduction}
</Introduction>`;
}

// Function to format the guidelines section
export function formatGuideline(guideline: string) {
  return `<Guideline>
  ${guideline}
</Guideline>`;
}

// Function to format examples
export function formatExamples(examples: { text: string }[]) {
  if (!examples || examples.length === 0) return "";

  const formattedExamples = examples.map(
    (example) => `<Example>
  ${example.text}
</Example>`
  );

  const examplesContent = formattedExamples.join("\n\n");

  return `<Examples>
  ${examplesContent}
</Examples>`;
}
