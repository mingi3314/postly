// Function to format the introduction section
export function formatIntroduction(introduction: string) {
  return `<Introduction>
  ${introduction}
  </Introduction>`;
}

// Function to format the guidelines section
export function formatGuidelines(guidelines: string) {
  return `<Guidelines>
  ${guidelines}
  </Guidelines>`;
}

// Function to format examples
export function formatExamples(examples: string[]) {
  if (!examples || examples.length === 0) return "";

  const formattedExamples = examples.map(
    (example) => `<Example>
  ${example}
  </Example>`
  );

  const examplesContent = formattedExamples.join("\n\n");

  return `<Examples>
  ${examplesContent}
  </Examples>`;
}
