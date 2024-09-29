import axios from "axios";
import { NewsResponse, NewsItem } from "../../src/types";
import {
  NAVER_API_URL,
  NAVER_CLIENT_ID,
  NAVER_CLIENT_SECRET,
  NEWS_DISPLAY_COUNT,
} from "../config/newsConfig.js";
import { NewsAPIError } from "../errors/NewsAPIError.js";

export class NewsAPI {
  async searchNews(query: string): Promise<NewsItem[]> {
    try {
      const response = await axios.get<NewsResponse>(NAVER_API_URL, {
        params: {
          query,
          display: NEWS_DISPLAY_COUNT,
          sort: "sim",
        },
        headers: {
          "X-Naver-Client-Id": NAVER_CLIENT_ID,
          "X-Naver-Client-Secret": NAVER_CLIENT_SECRET,
        },
      });

      return response.data.items;
    } catch (error) {
      console.error("Failed to fetch news:", error);
      throw new NewsAPIError("Failed to fetch news from Naver API");
    }
  }
}
