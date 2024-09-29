import * as cheerio from "cheerio";
import {
  NAVER_NEWS_URL,
  NAVER_ENTERTAIN_URL,
  NAVER_SPORTS_URL,
} from "../config/newsConfig.js";

export class ContentParser {
  parseNewsContent(url: string, htmlContent: string): string {
    const $ = cheerio.load(htmlContent);
    let content = "";

    if (url.startsWith(NAVER_NEWS_URL)) {
      content = $("#dic_area").text();
    } else if (
      url.startsWith(NAVER_ENTERTAIN_URL) ||
      url.startsWith(NAVER_SPORTS_URL)
    ) {
      content = $("div._article_content").text();
    }

    return content.trim();
  }
}
