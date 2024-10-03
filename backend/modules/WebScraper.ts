import axios from "axios";
import {
  NAVER_NEWS_URL,
  NAVER_ENTERTAIN_URL,
  NAVER_SPORTS_URL,
} from "../config/newsConfig.js";
import { WebScraperError } from "../errors/WebScraperError.js";

export class WebScraper {
  async fetchContent(url: string): Promise<string> {
    try {
      if (this.isEntertainmentNews(url)) {
        return await this.fetchEntertainmentNews(url);
      } else if (this.isSportsNews(url)) {
        return await this.fetchSportsNews(url);
      } else if (this.isGeneralNews(url)) {
        return await this.fetchGeneralNews(url);
      } else {
        throw new WebScraperError(`Unsupported URL format: ${url}`);
      }
    } catch (error: any) {
      throw new WebScraperError(
        `Failed to fetch content from ${url}: ${error.message}`
      );
    }
  }

  private isEntertainmentNews(url: string): boolean {
    return url.startsWith(NAVER_ENTERTAIN_URL);
  }

  private isSportsNews(url: string): boolean {
    return url.startsWith(NAVER_SPORTS_URL);
  }

  private isGeneralNews(url: string): boolean {
    return url.startsWith(NAVER_NEWS_URL);
  }

  private async fetchEntertainmentNews(url: string): Promise<string> {
    // Extract the article ID from the URL
    const match = url.match(/\/article\/(\d+)\/(\d+)/);
    if (!match) {
      throw new WebScraperError(`Invalid entertainment news URL: ${url}`);
    }
    const [_, officeId, articleId] = match;

    const apiUrl = `https://api-gw.entertain.naver.com/news/article/${officeId}/${articleId}`;
    try {
      const response = await axios.get(apiUrl, { timeout: 5000 });
      return JSON.stringify(response.data);
    } catch (error: any) {
      throw new WebScraperError(
        `Failed to fetch entertainment news from API: ${error.message}`
      );
    }
  }

  private async fetchSportsNews(url: string): Promise<string> {
    // Extract the article ID from the URL
    const match = url.match(/\/article\/(\d+)\/(\d+)/);
    if (!match) {
      throw new WebScraperError(`Invalid sports news URL: ${url}`);
    }
    const [_, officeId, articleId] = match;

    const apiUrl = `https://api-gw.sports.naver.com/news/article/${officeId}/${articleId}`;
    try {
      const response = await axios.get(apiUrl, { timeout: 5000 });
      return JSON.stringify(response.data);
    } catch (error: any) {
      throw new WebScraperError(
        `Failed to fetch sports news from API: ${error.message}`
      );
    }
  }

  private async fetchGeneralNews(url: string): Promise<string> {
    try {
      const response = await axios.get(url, { timeout: 5000 });
      return response.data;
    } catch (error: any) {
      throw new WebScraperError(
        `Failed to fetch general news from URL: ${error.message}`
      );
    }
  }
}
