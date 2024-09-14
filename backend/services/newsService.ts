import axios from "axios";
import { NewsResponse, NewsItem } from "../../src/types";

const NAVER_API_URL = "https://openapi.naver.com/v1/search/news.json";
const NAVER_CLIENT_ID = process.env.VUE_APP_NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.VUE_APP_NAVER_CLIENT_SECRET;

export async function searchNews(query: string): Promise<NewsItem[]> {
  try {
    const response = await axios.get<NewsResponse>(NAVER_API_URL, {
      params: {
        query: query,
        display: 30,
      },
      headers: {
        "X-Naver-Client-Id": NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": NAVER_CLIENT_SECRET,
      },
    });

    return response.data.items
      .filter(
        (item: NewsItem) =>
          item.link.startsWith("https://n.news.naver.com/") ||
          item.link.startsWith("https://m.entertain.naver.com/") ||
          item.link.startsWith("https://m.sports.naver.com/")
      )
      .slice(0, 3);
  } catch (error) {
    console.error("Failed to fetch news:", error);
    throw error;
  }
}
