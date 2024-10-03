import axios from "axios";
import type { NewsItem } from "../types";

export class ContentParserService {
  constructor(private apiUrl: string) {}

  async parseNewsContents(newsItems: NewsItem[]): Promise<string[]> {
    return await Promise.all(
      newsItems.map(async (item) => {
        try {
          const response = await axios.get<{ parsedContent: string }>(
            `${this.apiUrl}/parse-news-content?url=${encodeURIComponent(
              item.link
            )}`
          );
          return response.data.parsedContent;
        } catch (error) {
          console.error(`Failed to parse content for ${item.link}:`, error);
          return "";
        }
      })
    );
  }
}
