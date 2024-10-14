import { useToast as usePrimeVueToast } from "primevue/usetoast";

export function useToast() {
  const toast = usePrimeVueToast();

  const showToast = (
    severity: "success" | "info" | "warn" | "error" | "secondary" | "contrast",
    summary: string,
    detail: string
  ) => {
    toast.add({ severity, summary, detail, life: 3000 });
  };

  const showSuccess = (message: string) => {
    showToast("success", "성공", message);
  };

  const showError = (message: string) => {
    showToast("error", "오류", message);
  };

  return {
    showSuccess,
    showError,
  };
}
