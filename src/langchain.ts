import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import dotenv from "dotenv";

dotenv.config();

const prompt = PromptTemplate.fromTemplate(`
    Generate an Instagram post with a friendly and engaging tone based on the following references:
    {references}
  `);

const model = new ChatOpenAI({
  model: "gpt-4o-mini",
});

const parser = new StringOutputParser();

// 자동 글 생성 함수
export async function generatePost(referenceTexts: string[]): Promise<string> {
  // Few-shot prompting 예시
  const input = { references: referenceTexts.join("\n") };

  const chain = prompt.pipe(model).pipe(parser);

  // OpenAI API로 요청
  const result = await chain.invoke(input);

  return result;
}
