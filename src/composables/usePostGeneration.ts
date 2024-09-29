import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useArticleStore } from "../stores/articleStore";
import { useToast } from "primevue/usetoast";

export function usePostGeneration() {
  const router = useRouter();
  const articleStore = useArticleStore();
  const toast = useToast();

  const isLoading = ref(true);
  const loadingStage = ref("references");
  const error = ref("");

  const generatedPost = computed(() => articleStore.generatedPost || "");

  const reset = () => {
    articleStore.setTopic("");
    articleStore.setDirectTexts([]);
    router.push("/");
  };

  const copyPost = () => {
    navigator.clipboard.writeText(generatedPost.value);
    toast.add({
      severity: "success",
      summary: "성공",
      detail: "포스트가 복사되었습니다.",
      life: 3000,
      group: "bc",
    });
  };

  const generatePost = async () => {
    try {
      loadingStage.value = "references";
      const references = await articleStore.getReferences();

      loadingStage.value = "generating";
      await articleStore.createPost(references);

      loadingStage.value = "finalizing";
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (e: unknown) {
      error.value =
        e instanceof Error ? e.message : "포스트 생성 중 오류가 발생했습니다.";
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    loadingStage,
    error,
    generatedPost,
    reset,
    copyPost,
    generatePost,
  };
}
