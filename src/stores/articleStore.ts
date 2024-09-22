import { defineStore } from "pinia";
import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL;

export const useArticleStore = defineStore("article", {
  state: () => ({
    topic: "",
    generatedPost: "",
  }),
  actions: {
    setTopic(newTopic: string) {
      this.topic = newTopic;
    },
    async generatePost() {
      if (!this.topic) {
        throw new Error("주제가 설정되지 않았습니다.");
      }
      try {
        // 1. Fetch news content
        const newsContentResponse = await axios.get(
          `${API_URL}/news-contents?query=${this.topic}`
        );
        const newsContents = newsContentResponse.data.newsContents;

        // 2. Generate post
        const generatePostResponse = await axios.post(
          `${API_URL}/generate-post`,
          {
            newsContents: newsContents,
          }
        );
        this.generatedPost = generatePostResponse.data.result;
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
