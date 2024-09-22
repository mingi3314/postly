<template>
  <div class="result-page">
    <template v-if="isLoading">
      <LoadingComponent />
    </template>
    <template v-else-if="error">
      <p class="error">{{ error }}</p>
      <button class="btn btn-primary" @click="reset">다시 시도하기</button>
    </template>
    <template v-else>
      <h1>생성된 포스트를 확인해보세요.</h1>
      <GeneratedPost :content="generatedPost" />
      <div class="button-container">
        <button class="btn btn-primary" @click="reset">처음으로</button>
        <button class="btn btn-secondary" @click="copyPost">
          포스트 복사하기
        </button>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import GeneratedPost from "../components/GeneratedPost.vue";
import LoadingComponent from "../components/LoadingComponent.vue";
import { useArticleStore } from "../stores/articleStore";

export default defineComponent({
  components: { GeneratedPost, LoadingComponent },
  setup() {
    const router = useRouter();
    const articleStore = useArticleStore();
    const isLoading = ref(true);
    const error = ref("");

    onMounted(async () => {
      try {
        await articleStore.generatePost();
      } catch (e: unknown) {
        if (e instanceof Error) {
          error.value = e.message;
        } else {
          error.value = "포스트 생성 중 오류가 발생했습니다.";
        }
      } finally {
        isLoading.value = false;
      }
    });

    const generatedPost = computed(() => articleStore.generatedPost || "");

    const reset = () => {
      articleStore.setTopic("");
      router.push("/");
    };

    const copyPost = () => {
      navigator.clipboard.writeText(generatedPost.value);
      alert("포스트가 복사되었습니다.");
    };

    return {
      generatedPost,
      isLoading,
      error,
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
