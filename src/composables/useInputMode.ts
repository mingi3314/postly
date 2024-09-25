import { ref } from "vue";

interface InputMode {
  name: string;
  value: "keyword" | "text";
}

export function useInputMode() {
  const inputModes = ref<InputMode[]>([
    { name: "키워드로 생성하기", value: "keyword" },
    { name: "직접 텍스트 입력하기", value: "text" },
  ]);
  const inputMode = ref<InputMode>(inputModes.value[0]);

  return {
    inputModes,
    inputMode,
  };
}
