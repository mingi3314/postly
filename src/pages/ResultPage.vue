<template>
  <div class="result-page">
    <Toast />
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
      <h1 class="text-2xl text-center m-4 text-primary-800">
        생성된 포스트를 확인해보세요.
      </h1>
      <GeneratedPost :content="generatedPost" />
      <div class="flex justify-center gap-4 mt-4">
        <Button label="처음으로" @click="reset" class="p-button-secondary" />
        <Toast position="bottom-center" group="bc" />
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
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

export default defineComponent({
  components: { GeneratedPost, LoadingComponent, Button, Message, Toast },
  setup() {
    const router = useRouter();
    const articleStore = useArticleStore();
    const isLoading = ref(true);
    const error = ref("");
    const toast = useToast();

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
      articleStore.setDirectTexts([]);
      router.push("/");
    };

    const copyPost = () => {
      navigator.clipboard.writeText(generatedPost.value);
      toast.add({
        severity: "success",
        summary: "성공",
        detail: "포스트가 복사되었습니다.",
        life: 3000,
        group: "bc",
      });
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
