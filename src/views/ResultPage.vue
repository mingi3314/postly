<template>
  <div class="result-page">
    <h1>변환된 기사 내용을 확인하세요.</h1>
    <GeneratedArticle :content="generatedPost" />
    <div class="button-container">
      <button class="btn btn_1" @click="reset">다시 변환하기</button>
      <button class="btn btn_2" @click="copyPost">기사 복사하기</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import GeneratedArticle from "../components/GeneratedArticle.vue";
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
.result-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn_1 {
  background-color: #a09eb0;
  color: #0b0564;
  margin-right: 10px;
}

.btn_2 {
  background-color: #0095f6;
  color: white;
}

.btn:hover {
  opacity: 0.8;
}

@media (min-width: 768px) {
  h1 {
    font-size: 20px;
  }
}
</style>
