<template>
  <div class="result-page">
    <h1>생성된 포스트를 확인해보세요.</h1>
    <GeneratedArticle :content="generatedPost" />
    <div class="button-container">
      <button class="btn btn-primary" @click="reset">처음으로</button>
      <button class="btn btn-secondary" @click="copyPost">
        포스트 복사하기
      </button>
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
      articleStore.setTopic("");
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
  max-width: 100%;
  margin: 0;
  padding: 20px 0;
  overflow-x: hidden;
}

h1 {
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
  padding: 0 20px;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  padding: 0 20px;
}

@media (max-width: 768px) {
  .button-container {
    flex-direction: column;
  }
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #a09eb0;
  color: #0b0564;
  margin-right: 10px;
}

.btn-secondary {
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
