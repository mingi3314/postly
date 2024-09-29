<template>
  <div
    class="flex flex-col justify-center items-center min-h-screen px-4 bg-surface-50"
  >
    <h1 class="text-5xl font-bold mb-12 text-primary-800">Post.ly</h1>

    <SelectButton
      v-model="inputMode"
      :options="inputModes"
      optionLabel="name"
      class="mb-4"
    />

    <KeywordInput
      v-if="inputMode.value === 'keyword'"
      v-model="topic"
      @generate="generatePostFromKeyword"
    />

    <DirectTextInput v-else @generate="generatePostFromText" />

    <p class="text-surface-600 text-lg max-w-md text-center mt-4">
      {{ inputModeDescription }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useArticleStore } from "../stores/articleStore";
import { useInputMode } from "../composables/useInputMode";
import SelectButton from "primevue/selectbutton";
import DirectTextInput from "../components/DirectTextInput.vue";
import KeywordInput from "../components/KeywordInput.vue";

export default defineComponent({
  components: {
    SelectButton,
    DirectTextInput,
    KeywordInput,
  },
  setup() {
    const topic = ref("");
    const router = useRouter();
    const articleStore = useArticleStore();
    const { inputModes, inputMode } = useInputMode();

    const generatePostFromKeyword = async () => {
      if (topic.value.trim()) {
        await articleStore.setTopic(topic.value.trim());
        router.push("/result");
      }
    };

    const generatePostFromText = async (texts: string[]) => {
      await articleStore.setDirectTexts(texts);
      router.push("/result");
    };

    const inputModeDescription = computed(
      () =>
        ({
          keyword: "관련 뉴스를 찾아 포스트를 생성해드려요 ☺️",
          text: "입력한 텍스트를 기반으로 포스트를 생성해드려요 ☺️",
        }[inputMode.value.value])
    );

    return {
      topic,
      generatePostFromKeyword,
      inputModes,
      inputMode,
      generatePostFromText,
      inputModeDescription,
    };
  },
});
</script>
