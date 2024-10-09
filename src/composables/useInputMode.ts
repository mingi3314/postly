import { ref } from "vue";

type InputModeValue = "keyword" | "text";

interface InputModeOption {
  name: string;
  value: InputModeValue;
}

export function useInputMode() {
  const inputModes = ref<InputModeOption[]>([
    { name: "키워드로 생성하기", value: "keyword" },
    { name: "직접 텍스트 입력하기", value: "text" },
  ]);
  const inputMode = ref<InputModeValue>("keyword");

  return {
    inputModes,
    inputMode,
  };
}
