import { defineStore } from "pinia";
import { PostExampleService } from "@/services/PostExampleService";
import type { PostExample } from "@/types";

const postExampleService = new PostExampleService();

export const usePostExampleStore = defineStore("example", {
  state: () => ({
    examples: [] as PostExample[],
  }),
  actions: {
    async fetchExamples(userId: string): Promise<PostExample[]> {
      this.examples = await postExampleService.fetchExamples(userId);
      return this.examples;
    },
    async addExample(userId: string, content: string) {
      const newExample = await postExampleService.addExample(userId, content);
      this.examples.push(newExample);
    },
    async updateExample(id: string, content: string) {
      const updatedExample = await postExampleService.updateExample(
        id,
        content
      );
      const index = this.examples.findIndex((e) => e.id === id);
      if (index !== -1) {
        this.examples[index] = updatedExample;
      }
    },
    async deleteExample(id: string) {
      await postExampleService.deleteExample(id);
      this.examples = this.examples.filter((e) => e.id !== id);
    },
  },
});
