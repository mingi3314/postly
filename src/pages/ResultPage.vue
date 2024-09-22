<template>
  <div class="result-page">
    <template v-if="isLoading">
      <LoadingComponent />
    </template>
    <template v-else-if="error">
      <Message severity="error" :closable="false" class="mb-4">{{
        error
      }}</Message>
      <Button label="다시 시도하기" @click="reset" class="mt-4" />
    </template>
    <template v-else>
      <h1 class="text-2xl text-center m-4">생성된 포스트를 확인해보세요.</h1>
      <GeneratedPost :content="generatedPost" />
      <div class="flex justify-center gap-4 mt-4">
        <Button label="처음으로" @click="reset" class="p-button-secondary" />
        <Button
          label="포스트 복사하기"
          @click="copyPost"
          class="p-button-primary"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import GeneratedPost from "../components/GeneratedPost.vue";
import LoadingComponent from "../components/LoadingComponent.vue";
import { useArticleStore } from "../stores/articleStore";
import Button from "primevue/button";
import Message from "primevue/message";

export default defineComponent({
  components: { GeneratedPost, LoadingComponent, Button, Message },
  setup() {
    const router = useRouter();
    const articleStore = useArticleStore();
    const isLoading = ref(true);
    const error = ref("");

    onMounted(async () => {
      try {
        await articleStore.generatePost();
      } catch (e: unknown) {
        if (e instanceof Error) {
          error.value = e.message;
        } else {
          error.value = "포스트 생성 중 오류가 발생했습니다.";
        }
      } finally {
        isLoading.value = false;
      }
    });

    const generatedPost = computed(() => articleStore.generatedPost || "");

    const reset = () => {
      articleStore.setTopic("");
      router.push("/");
    };

    const copyPost = () => {
      navigator.clipboard.writeText(generatedPost.value);
      alert("포스트가 복사되었습니다.");
    };

    return {
      generatedPost,
      isLoading,
      error,
      reset,
      copyPost,
    };
  },
});
</script>
