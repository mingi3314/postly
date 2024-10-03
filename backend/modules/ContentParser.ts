import * as cheerio from "cheerio";
import {
  NAVER_NEWS_URL,
  NAVER_ENTERTAIN_URL,
  NAVER_SPORTS_URL,
} from "../config/newsConfig.js";

export class ContentParser {
  parseNewsContent(url: string, content: string): string {
    if (url.startsWith(NAVER_NEWS_URL)) {
      return this.parseGeneralNewsContent(content);
    } else if (url.startsWith(NAVER_ENTERTAIN_URL)) {
      return this.parseEntertainmentNewsContent(content);
    } else if (url.startsWith(NAVER_SPORTS_URL)) {
      return this.parseSportsNewsContent(content);
    } else {
      throw new Error(`Unsupported URL format: ${url}`);
    }
  }

  private parseGeneralNewsContent(htmlContent: string): string {
    const $ = cheerio.load(htmlContent);
    const content = $("#dic_area").text();
    return content.trim();
  }

  private parseEntertainmentNewsContent(jsonContent: string): string {
    const data = JSON.parse(jsonContent);
    const content = data.result.articleInfo.article.refinedContent;
    return content.trim();
  }

  private parseSportsNewsContent(jsonContent: string): string {
    const data = JSON.parse(jsonContent);
    const content = data.result.articleInfo.article.refinedContent;
    return content.trim();
  }
}
