import { NewsAPI } from "../modules/NewsAPI.js";
import { WebScraper } from "../modules/WebScraper.js";
import { ContentParser } from "../modules/ContentParser.js";
import { NewsItem, ParsedContent } from "../../src/types";
import {
  MAX_NEWS_ITEMS,
  NAVER_ENTERTAIN_URL,
  NAVER_SPORTS_URL,
  NAVER_NEWS_URL,
} from "../config/newsConfig.js";
import { NewsServiceError } from "../errors/NewsServiceError.js";

export class NewsService {
  constructor(
    private newsAPI: NewsAPI,
    private webScraper: WebScraper,
    private contentParser: ContentParser
  ) {}

  async fetchNewsContent(topic: string): Promise<ParsedContent[]> {
    try {
      const newsItems = await this.newsAPI.searchNews(topic);
      const filteredNewsItems = this.filterNewsItems(newsItems);

      if (filteredNewsItems.length === 0) {
        throw new NewsServiceError(
          "해당 주제에 대한 네이버 뉴스를 찾을 수 없습니다. 다른 주제로 시도해주세요."
        );
      }

      const contents = await Promise.all(
        filteredNewsItems.map((item) =>
          this.fetchAndParseNewsContent(item.link)
        )
      );

      const validContents = contents.filter(
        (content) => content.text.length > 0
      );

      if (validContents.length === 0) {
        throw new NewsServiceError(
          "뉴스 본문을 가져오는데 실패했습니다. 다시 시도해주세요."
        );
      }

      return validContents;
    } catch (error) {
      if (error instanceof NewsServiceError) {
        throw error;
      }
      throw new NewsServiceError(
        "뉴스 콘텐츠를 가져오는 중 오류가 발생했습니다."
      );
    }
  }

  private filterNewsItems(newsItems: NewsItem[]): NewsItem[] {
    return newsItems
      .filter((item) => this.isValidNewsUrl(item.link))
      .slice(0, MAX_NEWS_ITEMS);
  }

  private isValidNewsUrl(url: string): boolean {
    return [NAVER_NEWS_URL, NAVER_ENTERTAIN_URL, NAVER_SPORTS_URL].some(
      (validUrl) => url.startsWith(validUrl)
    );
  }

  private async fetchAndParseNewsContent(url: string): Promise<ParsedContent> {
    try {
      const htmlContent = await this.webScraper.fetchHtmlContent(url);
      const parsedContent = this.contentParser.parseNewsContent(
        url,
        htmlContent
      );
      return { text: parsedContent };
    } catch (error) {
      const errorMessage = `Failed to fetch or parse news content from ${url}:\n${error}`;
      console.error(errorMessage);
      throw new NewsServiceError(errorMessage);
    }
  }
}
