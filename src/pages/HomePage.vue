<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useArticleStore } from "../stores/articleStore";
import { useInputMode } from "../composables/useInputMode";
import SelectButton from "primevue/selectbutton";
import DirectTextInput from "../components/DirectTextInput.vue";
import KeywordInput from "../components/KeywordInput.vue";

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
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 bg-surface-50"
  >
    <div class="w-full max-w-md -mt-16 md:-mt-24">
      <h2 class="text-3xl font-bold mb-12 text-primary-800 text-center">
        어떤 주제로<br class="md:hidden" />
        포스트를 작성할까요?
      </h2>

      <div class="flex justify-center mb-8">
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
        class="mb-8"
      />

      <DirectTextInput v-else @generate="generatePostFromText" class="mb-8" />

      <p class="text-surface-600 text-lg text-center mt-8">
        {{ inputModeDescription }}
      </p>
    </div>
  </div>
</template>
