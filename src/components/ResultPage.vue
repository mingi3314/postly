<template>
  <div>
    <h1>변환된 기사 내용을 확인하세요.</h1>
    <!-- Ensure generatedPost is defined before passing it -->
    <GeneratedArticle :content="generatedPost" />
    <button class="btn_1" @click="reset">다시 변환하기</button>
    <button @click="copyPost">기사 복사하기</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import GeneratedArticle from "./GeneratedArticle.vue";
import { useArticleStore } from "../stores/articleStore";

export default defineComponent({
  components: { GeneratedArticle },
  setup() {
    const router = useRouter();
    const articleStore = useArticleStore();

    // Ensure generatedPost is not undefined
    const generatedPost = articleStore.generatedPost || "";

    const reset = () => {
      articleStore.setReferences([]);
      router.push("/");
    };

    const copyPost = () => {
      navigator.clipboard.writeText(generatedPost);
      alert("기사가 복사되었습니다.");
    };

    return {
      generatedPost,
      reset,
      copyPost,
    };
  },
});
</script>

<style scoped>
.btn_1 {
  margin-right: 16px;
  background-color: #a09eb0;
  color: #0b0564;
}
</style>
