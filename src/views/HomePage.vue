<template>
  <div>
    <h1>변환할 기사의 내용을 입력하세요.</h1>
    <p>기사는 최대 3개, 각 기사 내용은 5,000자 이내로 입력할 수 있습니다.</p>
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

<style scoped>
h1 {
  margin: 0;
  font-size: 24px;
}

p {
  margin: 8px 0 20px 0;
  font-size: 14px;
}

label {
  font-size: 16px;
  font-weight: 500;
}

@media (min-width: 768px) {
  h1 {
    font-size: 32px;
  }

  p {
    margin: 8px 0 40px 0;
    font-size: 16px;
  }
}
</style>
