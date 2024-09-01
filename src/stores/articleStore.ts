import { defineStore } from "pinia";
import { Reference } from "../types";
import { generatePost } from "../langchain";

export const useArticleStore = defineStore("article", {
  state: () => ({
    references: [] as Reference[],
    generatedPost: "",
  }),
  actions: {
    // Action to set references in the store
    setReferences(refs: Reference[]) {
      this.references = refs;
    },

    // Action to generate the post based on the provided references
    async generatePost() {
      this.generatedPost = await generatePost(this.references);
    },
  },
});
