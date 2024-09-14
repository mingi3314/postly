import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import axios from "axios";
import * as cheerio from "cheerio";
import { NewsItem } from "../../src/types";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { searchNews } from "./newsService.js";
import { generatePostPrompt } from "../prompts/generatePostPrompt";

async function fetchNewsContent(url: string): Promise<string> {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    let content = "";

    if (url.startsWith("https://n.news.naver.com/")) {
      content = $("#dic_area").text();
    } else if (
      url.startsWith("https://m.entertain.naver.com/") ||
      url.startsWith("https://m.sports.naver.com/")
    ) {
      content = $("#_article_content").text();
    }

    return content.trim();
  } catch (error) {
    console.error(`Failed to fetch news content from ${url}:`, error);
    return "";
  }
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

export async function generatePost(topic: string): Promise<string> {
  const newsItems: NewsItem[] = await searchNews(topic);

  if (newsItems.length === 0) {
    throw new Error(
      "해당 주제에 대한 네이버 뉴스를 찾을 수 없습니다. 다른 주제로 시도해주세요."
    );
  }

  const newsContents = await Promise.all(
    newsItems.map((item) => fetchNewsContent(item.link))
  );

  const validContents: { text: string }[] = newsContents
    .filter((content) => content.length > 0)
    .map((content) => ({ text: content }));

  if (validContents.length === 0) {
    throw new Error("뉴스 본문을 가져오는데 실패했습니다. 다시 시도해주세요.");
  }

  const prompt = PromptTemplate.fromTemplate(generatePostPrompt);

  const model = new ChatOpenAI({
    model: "gpt-4o-mini",
    apiKey: process.env.VUE_APP_OPENAI_API_KEY,
  });

  const parser = new StringOutputParser();

  const formattedReferences = validContents
    .map((ref) => formatReference(ref))
    .join("\n\n");
  const input = {
    references: formattedReferences,
  };

  const chain = prompt.pipe(model).pipe(parser);

  return await chain.invoke(input);
}
