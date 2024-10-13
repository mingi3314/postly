import { defineStore } from "pinia";
import { ExampleService } from "@/services/ExampleService";
import type { PostExample } from "@/types";

const exampleService = new ExampleService();

export const useExampleStore = defineStore("example", {
  state: () => ({
    examples: [] as PostExample[],
  }),
  actions: {
    async fetchExamples(userId: string): Promise<PostExample[]> {
      this.examples = await exampleService.getExamples(userId);
      return this.examples;
    },
    async addExample(userId: string, content: string) {
      const newExample = await exampleService.addExample(userId, content);
      this.examples.push(newExample);
    },
    async updateExample(id: string, content: string) {
      const updatedExample = await exampleService.updateExample(id, content);
      const index = this.examples.findIndex((e) => e.id === id);
      if (index !== -1) {
        this.examples[index] = updatedExample;
      }
    },
    async deleteExample(id: string) {
      await exampleService.deleteExample(id);
      this.examples = this.examples.filter((e) => e.id !== id);
    },
  },
});
