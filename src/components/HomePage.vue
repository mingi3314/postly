<template>
  <div>
    <h1>변환할 기사의 내용을 입력하세요.</h1>
    <ArticleInputForm :references="references" />
    <button @click="generatePost">기사 변환하기</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ArticleInputForm from "./ArticleInputForm.vue";
import { useRouter } from "vue-router";
import { Reference } from "../types";

export default defineComponent({
  components: { ArticleInputForm },
  setup() {
    const references = ref<Reference[]>([
      { text: "" },
      { text: "" },
      { text: "" },
    ]);
    const router = useRouter();

    const generatePost = () => {
      // Serialize references to a query string or route params
      const serializedReferences = JSON.stringify(references.value);
      router.push({ path: "/loading", query: { refs: serializedReferences } });
    };

    return {
      references,
      generatePost,
    };
  },
});
</script>
