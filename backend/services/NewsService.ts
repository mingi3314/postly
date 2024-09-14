import axios from "axios";
import * as cheerio from "cheerio";
import { NewsResponse, NewsItem } from "../../src/types";

const NAVER_API_URL = "https://openapi.naver.com/v1/search/news.json";
const NAVER_CLIENT_ID = process.env.VUE_APP_NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.VUE_APP_NAVER_CLIENT_SECRET;

const NAVER_NEWS_URL = "https://n.news.naver.com/";
const NAVER_ENTERTAIN_URL = "https://m.entertain.naver.com/";
const NAVER_SPORTS_URL = "https://m.sports.naver.com/";

export async function fetchNewsContent(
  topic: string
): Promise<{ text: string }[]> {
  const newsItems = await searchNews(topic);

  if (newsItems.length === 0) {
    throw new Error(
      "해당 주제에 대한 네이버 뉴스를 찾을 수 없습니다. 다른 주제로 시도해주세요."
    );
  }

  const contents = await Promise.all(
    newsItems.map((item) => fetchContent(item.link))
  );
  const validContents = contents
    .filter((content) => content.length > 0)
    .map((content) => ({ text: content }));

  if (validContents.length === 0) {
    throw new Error("뉴스 본문을 가져오는데 실패했습니다. 다시 시도해주세요.");
  }

  return validContents;
}

async function searchNews(query: string): Promise<NewsItem[]> {
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
    throw new Error("Failed to fetch news");
  }
}

async function fetchContent(url: string): Promise<string> {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    let content = "";

    if (url.startsWith(NAVER_NEWS_URL)) {
      content = $("#dic_area").text();
    } else if (
      url.startsWith(NAVER_ENTERTAIN_URL) ||
      url.startsWith(NAVER_SPORTS_URL)
    ) {
      content = $("#_article_content").text();
    }

    return content.trim();
  } catch (error) {
    console.error(`Failed to fetch news content from ${url}:`, error);
    return "";
  }
}
