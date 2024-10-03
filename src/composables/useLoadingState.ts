import { LoadingStage } from "@/types";
import { ref, computed } from "vue";

export function useLoadingState() {
  const isLoading = ref(false);
  const loadingStage = ref<LoadingStage>("initializing");
  const error = ref("");

  const progressPercentage = computed(() => {
    switch (loadingStage.value) {
      case "initializing":
        return 0;
      case "references":
        return 33;
      case "generating":
        return 66;
      case "finalizing":
        return 100;
      default:
        return 0;
    }
  });

  const setLoading = (loading: boolean) => {
    isLoading.value = loading;
  };

  const setLoadingStage = (stage: LoadingStage) => {
    loadingStage.value = stage;
  };

  const setError = (errorMessage: string) => {
    error.value = errorMessage;
  };

  const resetError = () => {
    error.value = "";
  };

  return {
    isLoading,
    loadingStage,
    error,
    progressPercentage,
    setLoading,
    setLoadingStage,
    setError,
    resetError,
  };
}
