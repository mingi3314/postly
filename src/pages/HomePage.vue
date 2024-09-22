<template>
  <div
    class="flex flex-col justify-center items-center min-h-screen px-4 bg-gray-50"
  >
    <h1 class="text-5xl font-bold mb-12 text-primary-800">Post.ly</h1>
    <div class="w-full max-w-xl mb-6">
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
    <p class="text-gray-600 text-lg max-w-md text-center mt-4">
      관련 뉴스를 찾아 포스트를 생성해드려요 ☺️
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

export default defineComponent({
  components: {
    InputText,
    IconField,
    InputIcon,
  },
  setup() {
    const topic = ref("");
    const router = useRouter();
    const articleStore = useArticleStore();

    const generatePost = async () => {
      if (topic.value.trim()) {
        await articleStore.setTopic(topic.value.trim());
        router.push("/result");
      }
    };

    return { topic, generatePost };
  },
});
</script>
