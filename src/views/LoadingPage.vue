<template>
  <div class="loading-page">
    <p>기사를 변환 중입니다...</p>
    <LoadingSpinner />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useArticleStore } from "../stores/articleStore";
import LoadingSpinner from "../components/LoadingSpinner.vue";

export default defineComponent({
  components: { LoadingSpinner },
  setup() {
    const router = useRouter();
    const articleStore = useArticleStore();

    onMounted(async () => {
      await articleStore.generatePost();
      router.push({ name: "Result" });
    });

    return {};
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
}
</style>
