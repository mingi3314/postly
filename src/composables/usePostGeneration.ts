import { ref } from "vue";
import { useRouter } from "vue-router";
import { useArticleStore } from "../stores/articleStore";
import { useToast } from "primevue/usetoast";
import { useLoadingState } from "./useLoadingState";
import type { Reference } from "../types";

export function usePostGeneration() {
  const router = useRouter();
  const articleStore = useArticleStore();
  const toast = useToast();
  const {
    isLoading,
    loadingStage,
    error,
    progressPercentage,
    setLoading,
    setLoadingStage,
    setError,
    resetError,
  } = useLoadingState();

  const generatedPost = ref("");
  const references = ref<Reference[]>([]);

  const reset = () => {
    articleStore.setTopic("");
    articleStore.setDirectTexts([]);
    generatedPost.value = "";
    references.value = [];
    resetError();
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

  const generatePost = async (useExistingReferences = false) => {
    try {
      setLoading(true);
      resetError();
      setLoadingStage("initializing");

      if (!useExistingReferences || references.value.length === 0) {
        setLoadingStage("references");
        references.value = await articleStore.getReferences();
      }

      setLoadingStage("generating");
      generatedPost.value = await articleStore.createPost(references.value);

      setLoadingStage("finalizing");
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (e: unknown) {
      setError(
        e instanceof Error ? e.message : "포스트 생성 중 오류가 발생했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  const regeneratePost = () => generatePost(true);

  return {
    isLoading,
    loadingStage,
    error,
    generatedPost,
    reset,
    copyPost,
    generatePost,
    regeneratePost,
    progressPercentage,
  };
}
