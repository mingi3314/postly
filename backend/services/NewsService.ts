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
  const filteredNewsItems = filterNewsItems(newsItems);

  if (filteredNewsItems.length === 0) {
    throw new Error(
      "해당 주제에 대한 네이버 뉴스를 찾을 수 없습니다. 다른 주제로 시도해주세요."
    );
  }

  const contents = await Promise.all(
    filteredNewsItems.map((item) => fetchAndParseNewsContent(item.link))
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
    throw new Error("Failed to fetch news");
  }
}

function filterNewsItems(newsItems: NewsItem[]): NewsItem[] {
  return newsItems
    .filter(
      (item: NewsItem) =>
        item.link.startsWith(NAVER_NEWS_URL) ||
        item.link.startsWith(NAVER_ENTERTAIN_URL) ||
        item.link.startsWith(NAVER_SPORTS_URL)
    )
    .slice(0, 3);
}

async function fetchAndParseNewsContent(url: string): Promise<string> {
  try {
    const htmlContent = await fetchHtmlContent(url);
    return parseNewsContent(url, htmlContent);
  } catch (error) {
    console.error(`Failed to fetch or parse news content from ${url}:`, error);
    return "";
  }
}

async function fetchHtmlContent(url: string): Promise<string> {
  const response = await axios.get(url);
  return response.data;
}

function parseNewsContent(url: string, htmlContent: string): string {
  const $ = cheerio.load(htmlContent);
  let content = "a";

  if (url.startsWith(NAVER_NEWS_URL)) {
    content = $("#dic_area").text();
  } else if (
    url.startsWith(NAVER_ENTERTAIN_URL) ||
    url.startsWith(NAVER_SPORTS_URL)
  ) {
    content = $("div._article_content").text();
  }

  console.log(`content: ${content} for url: ${url}`);

  return content.trim();
}
