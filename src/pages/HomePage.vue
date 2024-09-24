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

    <div v-if="inputMode.value === 'keyword'" class="w-full max-w-xl mb-6">
      <IconField class="w-full" :pt="{ root: 'relative w-full' }">
        <InputText
          v-model="topic"
          placeholder="키워드를 입력해주세요..."
          class="w-full"
          @keyup.enter="generatePost"
          :pt="{
            root: 'flex-1 rounded-full h-14 w-full pl-6 pr-14 text-lg border-2 border-primary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 dark:focus:ring-primary-400/50',
          }"
        />
        <InputIcon>
          <i
            class="pi pi-search absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl text-primary-500 cursor-pointer hover:text-primary-600"
            @click="generatePost"
          ></i>
        </InputIcon>
      </IconField>
    </div>

    <DirectTextInput v-else @generate="generatePostFromText" />

    <p class="text-surface-600 text-lg max-w-md text-center mt-4">
      {{
        inputMode.value === "keyword"
          ? "관련 뉴스를 찾아 포스트를 생성해드려요 ☺️"
          : "입력한 텍스트를 기반으로 포스트를 생성해드려요 ☺️"
      }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useArticleStore } from "../stores/articleStore";
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import SelectButton from "primevue/selectbutton";
import DirectTextInput from "../components/DirectTextInput.vue";

export default defineComponent({
  components: {
    InputText,
    IconField,
    InputIcon,
    SelectButton,
    DirectTextInput,
  },
  setup() {
    const topic = ref("");
    const router = useRouter();
    const articleStore = useArticleStore();

    const inputModes = ref([
      { name: "키워드로 생성하기", value: "keyword" },
      { name: "직접 텍스트 입력하기", value: "text" },
    ]);
    const inputMode = ref(inputModes.value[0]);

    const generatePost = async () => {
      if (topic.value.trim()) {
        await articleStore.setTopic(topic.value.trim());
        router.push("/result");
      }
    };

    const generatePostFromText = async (texts: string[]) => {
      await articleStore.setDirectTexts(texts);
      router.push("/result");
    };

    return { topic, generatePost, inputModes, inputMode, generatePostFromText };
  },
});
</script>
