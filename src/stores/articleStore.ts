import { defineStore } from "pinia";
import { generatePost as generatePostService } from "../langchain";

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
      this.generatedPost = await generatePostService(this.topic);
    },
  },
});
