import { defineStore } from "pinia";
import { PostGuidelineService } from "@/services/PostGuidelineService";
import type { PostGuideline } from "@/types";

const postGuidelineService = new PostGuidelineService();

export const usePostGuidelineStore = defineStore("postGuideline", {
  state: () => ({
    guideline: null as PostGuideline | null,
  }),
  actions: {
    async getGuideline(userId: string): Promise<PostGuideline | null> {
      this.guideline = await postGuidelineService.getGuideline(userId);
      return this.guideline;
    },
    async addGuideline(userId: string, content: string) {
      const newGuideline = await postGuidelineService.addGuideline(
        userId,
        content
      );
      this.guideline = newGuideline;
    },
    async updateGuideline(id: string, content: string) {
      const updatedGuideline = await postGuidelineService.updateGuideline(
        id,
        content
      );
      this.guideline = updatedGuideline;
    },
    async deleteGuideline(id: string) {
      await postGuidelineService.deleteGuideline(id);
      this.guideline = null;
    },
  },
});
