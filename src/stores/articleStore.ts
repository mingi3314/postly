import { defineStore } from "pinia";
import type { Reference } from "../types";
import { NewsService } from "../services/NewsService";
import { ContentParserService } from "../services/ContentParserService";
import { PostGenerationService } from "../services/PostGenerationService";

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
        return await this.getReferencesFromTopic();
      } else {
        return this.getReferencesFromDirectTexts();
      }
    },
    async getReferencesFromTopic(): Promise<Reference[]> {
      const newsService = new NewsService(API_URL);
      const contentParserService = new ContentParserService(API_URL);

      try {
        // 1. 뉴스 검색
        const newsItems = await newsService.searchNews(this.topic);

        // 2. 뉴스 아이템 필터링
        const filteredNewsItems = newsService.filterNewsItems(newsItems);

        // 3. 뉴스 본문 파싱
        const parsedContents = await contentParserService.parseNewsContents(
          filteredNewsItems
        );

        // 4. 유효한 콘텐츠만 필터링
        return parsedContents
          .filter((content) => content && content.length > 0)
          .map((content) => ({ text: content }));
      } catch (error) {
        console.error("Failed to get references from topic:", error);
        throw new Error("뉴스 참조를 가져오는 데 실패했습니다.");
      }
    },
    getReferencesFromDirectTexts(): Reference[] {
      return this.directTexts.map((text) => ({ text }));
    },
    async createPost(references: Reference[]): Promise<string> {
      const postGenerationService = new PostGenerationService(API_URL);
      try {
        return await postGenerationService.generatePost(references);
      } catch (error) {
        console.error("Failed to create post:", error);
        throw new Error("포스트 생성에 실패했습니다.");
      }
    },
  },
});
