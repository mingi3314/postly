import axios from "axios";
import type { NewsItem } from "../types";
import {
  NAVER_NEWS_URL,
  NAVER_ENTERTAIN_URL,
  NAVER_SPORTS_URL,
} from "../../backend/config/newsConfig";

/**
 * NewsService class for handling news-related operations.
 * This service provides methods to search and filter news items.
 */
export class NewsService {
  /**
   * Creates an instance of NewsService.
   * @param apiUrl - The base URL for the news API.
   */
  constructor(private apiUrl: string) {}

  /**
   * Searches for news items based on a given query.
   *
   * @param options - The options for the search query.
   * @param options.query - The search query string.
   * @param options.filterByDomain - Whether to filter results by specific Naver domains. Defaults to true.
   * @returns A promise that resolves to an array of NewsItem objects.
   *
   * @example
   * // Search with domain filtering (default behavior)
   * const filteredNews = await newsService.searchNews({ query: "query" });
   *
   * // Search without domain filtering
   * const allNews = await newsService.searchNews({ query: "query", filterByDomain: false });
   */
  async searchNews({
    query,
    filterByDomain = true,
  }: {
    query: string;
    filterByDomain?: boolean;
  }): Promise<NewsItem[]> {
    const response = await axios.get<{ newsItems: NewsItem[] }>(
      `${this.apiUrl}/search-news?query=${query}`
    );

    if (filterByDomain) {
      // Filter news items based on allowed domains
      return response.data.newsItems.filter(
        (item) =>
          item.link.startsWith(NAVER_NEWS_URL) ||
          item.link.startsWith(NAVER_ENTERTAIN_URL) ||
          item.link.startsWith(NAVER_SPORTS_URL)
      );
    }

    return response.data.newsItems;
  }
}
