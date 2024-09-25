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
    async getReferences() {
      if (!this.topic && this.directTexts.length === 0) {
        throw new Error("주제 또는 텍스트가 설정되지 않았습니다.");
      }
      if (this.topic) {
        const response = await axios.get(
          `${API_URL}/news-contents?query=${this.topic}`
        );
        return response.data.newsContents;
      } else {
        return this.directTexts.map((text) => ({ text }));
      }
    },
    async createPost(references: { text: string }[]) {
      const response = await axios.post(`${API_URL}/generate-post`, {
        references,
      });
      this.generatedPost = response.data.result;
    },
  },
});
