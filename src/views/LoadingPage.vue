<template>
  <div class="loading-page">
    <p v-if="!error">포스트를 생성 중입니다...</p>
    <p v-else class="error">{{ error }}</p>
    <LoadingSpinner v-if="!error" />
    <button v-else class="btn btn-primary" @click="goHome">
      다시 시도하기
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useArticleStore } from "../stores/articleStore";
import LoadingSpinner from "../components/LoadingSpinner.vue";

export default defineComponent({
  components: { LoadingSpinner },
  setup() {
    const router = useRouter();
    const articleStore = useArticleStore();
    const error = ref("");

    const goHome = () => {
      router.push("/");
    };

    onMounted(async () => {
      try {
        await articleStore.generatePost();
        router.push({ name: "Result" });
      } catch (e: unknown) {
        if (e instanceof Error) {
          error.value = e.message;
        } else {
          error.value = "포스트 생성 중 오류가 발생했습니다.";
        }
      }
    });

    return { error, goHome };
  },
});
</script>

<style scoped>
.loading-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

.error {
  color: red;
  margin-bottom: 20px;
}
</style>
