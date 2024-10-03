import axios from "axios";
import type { NewsItem } from "../types";

export class NewsService {
  constructor(private apiUrl: string) {}

  async searchNews(query: string): Promise<NewsItem[]> {
    const response = await axios.get<{ newsItems: NewsItem[] }>(
      `${this.apiUrl}/search-news?query=${query}`
    );
    return response.data.newsItems;
  }
}
