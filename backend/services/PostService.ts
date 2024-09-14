import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { generatePostPrompt } from "../prompts/generatePostPrompt.js";

export async function generatePost(
  newsContents: { text: string }[]
): Promise<string> {
  const formattedReferences = newsContents
    .map((ref) => formatReference(ref))
    .join("\n\n");

  return await generatePostContent(formattedReferences);
}

async function generatePostContent(
  formattedReferences: string
): Promise<string> {
  const prompt = PromptTemplate.fromTemplate(generatePostPrompt);
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
