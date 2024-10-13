import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { createComposedPrompt } from "../prompts/CreateComposedPrompt.js";

export async function generatePost(
  references: { text: string }[]
): Promise<string> {
  const formattedReferences = references
    .map((ref) => formatReference(ref))
    .join("\n\n");

  return await generatePostContent(formattedReferences);
}

async function generatePostContent(
  formattedReferences: string
): Promise<string> {
  const systemTemplate = createComposedPrompt();
  const userTemplate = `<References>\n{references}\n</References>`;

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", systemTemplate],
    ["user", userTemplate],
  ]);
  const model = new ChatOpenAI({
    model: "gpt-4o-mini",
    apiKey: process.env.VUE_APP_OPENAI_API_KEY,
  });
  const parser = new StringOutputParser();
  const chain = prompt.pipe(model).pipe(parser);

  return await chain.invoke({ references: formattedReferences });
}

function indentText(text: string, level: number): string {
  const indent = "\t".repeat(level);
  return text
    .split("\n")
    .map((line) => indent + line)
    .join("\n");
}

function formatReference(reference: { text: string }): string {
  const openingTag = indentText(`<ReferenceSource>`, 1);
  const closingTag = indentText(`</ReferenceSource>`, 1);
  const indentedText = indentText(reference.text, 2);

  return `${openingTag}\n${indentedText}\n${closingTag}`;
}
