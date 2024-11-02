import { ref } from "vue";
import { useArticleStore } from "../stores/articleStore";
import { useExampleStore } from "../stores/exampleStore";
import { usePostGuidelineStore } from "../stores/postGuidelineStore";
import { useUserStore } from "../stores/userStore";
import { useToast } from "primevue/usetoast";
import { useLoadingState } from "./useLoadingState";
import type { Reference, PostExample, PostGuideline } from "../types";

export function usePostGeneration() {
  const articleStore = useArticleStore();
  const exampleStore = useExampleStore();
  const postGuidelineStore = usePostGuidelineStore();
  const userStore = useUserStore();
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
  const examples = ref<PostExample[]>([]);
  const guideline = ref<PostGuideline | null>(null);

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

      if (userStore.isLoggedIn && userStore.user) {
        examples.value = await exampleStore.fetchExamples(userStore.user.id);
        guideline.value = await postGuidelineStore.getGuideline(
          userStore.user.id
        );
      }

      setLoadingStage("generating");
      generatedPost.value = await articleStore.createPost(
        references.value,
        guideline.value?.content,
        examples.value
      );

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
    guideline,
    examples,
    copyPost,
    generatePost,
    regeneratePost,
    progressPercentage,
  };
}
