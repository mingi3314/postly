import { defineStore } from "pinia";
import axios from "axios";
import type { Reference, NewsItem } from "../types";
import {
  NAVER_NEWS_URL,
  NAVER_ENTERTAIN_URL,
  NAVER_SPORTS_URL,
  MAX_NEWS_ITEMS,
} from "../../backend/config/newsConfig";

const API_URL = process.env.VUE_APP_API_URL;

export const useArticleStore = defineStore("article", {
  state: () => ({
    topic: "",
    directTexts: [] as string[],
  }),
  actions: {
    setTopic(newTopic: string) {
      this.topic = newTopic;
    },
    setDirectTexts(texts: string[]) {
      this.directTexts = texts;
    },
    async getReferences(): Promise<Reference[]> {
      if (!this.topic && this.directTexts.length === 0) {
        throw new Error("주제 또는 텍스트가 설정되지 않았습니다.");
      }
      if (this.topic) {
        // 1. 뉴스 검색
        const searchResponse = await axios.get<{ newsItems: NewsItem[] }>(
          `${API_URL}/search-news?query=${this.topic}`
        );
        const newsItems = searchResponse.data.newsItems;

        // 2. 뉴스 아이템 필터링
        const filteredNewsItems = this.filterNewsItems(newsItems);

        // 3. 뉴스 본문 파싱
        const parsedContents = await Promise.all(
          filteredNewsItems.map(async (item) => {
            try {
              const parseResponse = await axios.get<{
                parsedContent: string;
              }>(
                `${API_URL}/parse-news-content?url=${encodeURIComponent(
                  item.link
                )}`
              );
              return parseResponse.data.parsedContent;
            } catch (error) {
              console.error(`Failed to parse content for ${item.link}:`, error);
              return ""; // 파싱 실패 시 빈 문자열 반환
            }
          })
        );

        // 4. 유효한 콘텐츠만 필터링
        const validContents = parsedContents.filter(
          (content) => content && content.length > 0
        );

        return validContents.map((content) => ({ text: content }));
      } else {
        return this.directTexts.map((text) => ({ text }));
      }
    },
    filterNewsItems(newsItems: NewsItem[]): NewsItem[] {
      return newsItems
        .filter((item) => this.isValidNewsUrl(item.link))
        .slice(0, MAX_NEWS_ITEMS);
    },
    isValidNewsUrl(url: string): boolean {
      return [NAVER_NEWS_URL, NAVER_ENTERTAIN_URL, NAVER_SPORTS_URL].some(
        (validUrl) => url.startsWith(validUrl)
      );
    },
    async createPost(references: Reference[]): Promise<string> {
      const response = await axios.post(`${API_URL}/generate-post`, {
        references,
      });
      return response.data.result;
    },
  },
});
