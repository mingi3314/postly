import { defineStore } from "pinia";
import type { NewsItem, Reference, Example, PostExample } from "../types";
import { NewsService } from "../services/NewsService";
import { ContentParserService } from "../services/ContentParserService";
import { PostGenerationService } from "../services/PostGenerationService";
import { MAX_NEWS_ITEMS } from "../../backend/config/newsConfig";

const API_URL =
  process.env.VERCEL_ENV === "production"
    ? "https://postly-six.vercel.app/api"
    : "http://localhost:3000/api";

export const useArticleStore = defineStore("article", {
  state: () => ({
    topic: "",
    directTexts: [] as string[],
    selectedNewsItems: [] as NewsItem[],
  }),
  actions: {
    setTopic(newTopic: string) {
      this.topic = newTopic;
    },
    setDirectTexts(texts: string[]) {
      this.directTexts = texts;
    },
    setSelectedNewsItems(newsItems: NewsItem[]) {
      this.selectedNewsItems = newsItems.slice(0, MAX_NEWS_ITEMS);
    },
    async searchNews(): Promise<NewsItem[]> {
      if (!this.topic) {
        throw new Error("Topic is not set");
      }
      const newsService = new NewsService(API_URL);
      return await newsService.searchNews({
        query: this.topic,
        filterByDomain: true,
      });
    },
    async getReferences(): Promise<Reference[]> {
      if (this.selectedNewsItems.length > 0) {
        return this.getReferencesFromSelectedNews();
      } else if (this.directTexts.length > 0) {
        return this.getReferencesFromDirectTexts();
      }
      throw new Error("No source for references");
    },
    async getReferencesFromSelectedNews(): Promise<Reference[]> {
      const contentParserService = new ContentParserService(API_URL);
      const parsedContents = await contentParserService.parseNewsContents(
        this.selectedNewsItems
      );
      return parsedContents
        .filter((content) => content && content.length > 0)
        .map((content) => ({ text: content }));
    },
    getReferencesFromDirectTexts(): Reference[] {
      return this.directTexts.map((text) => ({ text }));
    },
    async createPost(
      references: Reference[],
      examples: PostExample[]
    ): Promise<string> {
      const postGenerationService = new PostGenerationService(API_URL);
      const formattedExamples: Example[] = examples.map((example) => ({
        text: example.content,
      }));

      try {
        return await postGenerationService.generatePost({
          references,
          examples: formattedExamples,
        });
      } catch (error) {
        console.error("Failed to create post:", error);
        throw new Error("포스트 생성에 실패했습니다.");
      }
    },
  },
});
