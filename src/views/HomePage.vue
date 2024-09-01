<template>
  <div>
    <h1>변환할 기사의 내용을 입력하세요.</h1>
    <ArticleInputForm :references="references" />
    <button @click="generatePost">기사 변환하기</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useArticleStore } from "../stores/articleStore";
import ArticleInputForm from "../components/ArticleInputForm.vue";

export default defineComponent({
  components: { ArticleInputForm },
  setup() {
    const references = ref([{ text: "" }, { text: "" }, { text: "" }]);
    const router = useRouter();
    const articleStore = useArticleStore();

    const generatePost = () => {
      articleStore.setReferences(references.value);
      router.push("/loading");
    };

    return { references, generatePost };
  },
});
</script>
