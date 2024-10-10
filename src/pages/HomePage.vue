<template>
  <div
    class="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 bg-surface-50"
  >
    <h2 class="text-3xl font-bold mb-8 text-primary-800 text-center">
      인스타그램 포스트 생성기
    </h2>

    <div class="w-full max-w-md">
      <div class="flex justify-center mb-6">
        <SelectButton
          v-model="inputMode"
          :options="inputModes"
          optionLabel="name"
          optionValue="value"
          :allowEmpty="false"
          :pt="{
            root: { class: 'flex rounded-md overflow-hidden shadow-sm' },
          }"
        />
      </div>

      <KeywordInput
        v-if="inputMode === 'keyword'"
        v-model="topic"
        @generate="searchNews"
      />

      <DirectTextInput v-else @generate="generatePostFromText" />

      <p class="text-surface-600 text-lg text-center mt-6">
        {{ inputModeDescription }}
      </p>
    </div>
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

    const searchNews = async () => {
      if (topic.value.trim()) {
        await articleStore.setTopic(topic.value.trim());
        router.push("/news-selection");
      }
    };

    const generatePostFromText = async (texts: string[]) => {
      await articleStore.setDirectTexts(texts);
      router.push("/result");
    };

    const inputModeDescription = computed(() =>
      inputMode.value === "keyword"
        ? "관련 뉴스를 찾아 포스트를 생성해드려요 ☺️"
        : "입력한 텍스트를 기반으로 포스트를 생성해드려요 ☺️"
    );

    return {
      topic,
      searchNews,
      inputModes,
      inputMode,
      generatePostFromText,
      inputModeDescription,
    };
  },
});
</script>
