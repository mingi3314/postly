import { defineStore } from "pinia";
import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL;

export const useArticleStore = defineStore("article", {
  state: () => ({
    topic: "",
    directTexts: [] as string[],
    generatedPost: "",
  }),
  actions: {
    setTopic(newTopic: string) {
      this.topic = newTopic;
    },
    setDirectTexts(texts: string[]) {
      this.directTexts = texts;
    },
    async generatePost() {
      if (!this.topic && this.directTexts.length === 0) {
        throw new Error("주제 또는 텍스트가 설정되지 않았습니다.");
      }
      try {
        let response;
        if (this.topic) {
          // 1. Fetch news content
          const newsContentResponse = await axios.get(
            `${API_URL}/news-contents?query=${this.topic}`
          );
          const newsContents = newsContentResponse.data.newsContents;

          // 2. Generate post
          response = await axios.post(`${API_URL}/generate-post`, {
            newsContents: newsContents,
          });
        } else {
          // Generate post from direct texts
          response = await axios.post(`${API_URL}/generate-post`, {
            references: this.directTexts.map((text) => ({ text })),
          });
        }
        this.generatedPost = response.data.result;
      } catch (error) {
        console.error("Error generating post:", error);
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(
            error.response.data.error || "포스트 생성 중 오류가 발생했습니다."
          );
        } else {
          throw error;
        }
      }
    },
  },
});
