import axios from "axios";
import type { NewsItem } from "../types";
import {
  NAVER_NEWS_URL,
  NAVER_ENTERTAIN_URL,
  NAVER_SPORTS_URL,
  MAX_NEWS_ITEMS,
} from "../../backend/config/newsConfig";

export class NewsService {
  constructor(private apiUrl: string) {}

  async searchNews(query: string): Promise<NewsItem[]> {
    const response = await axios.get<{ newsItems: NewsItem[] }>(
      `${this.apiUrl}/search-news?query=${query}`
    );
    return response.data.newsItems;
  }

  filterNewsItems(newsItems: NewsItem[]): NewsItem[] {
    return newsItems
      .filter((item) => this.isValidNewsUrl(item.link))
      .slice(0, MAX_NEWS_ITEMS);
  }

  private isValidNewsUrl(url: string): boolean {
    return [NAVER_NEWS_URL, NAVER_ENTERTAIN_URL, NAVER_SPORTS_URL].some(
      (validUrl) => url.startsWith(validUrl)
    );
  }
}
