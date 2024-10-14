<template>
  <div class="result-page">
    <Toast />
    <template v-if="isLoading">
      <LoadingComponent :stage="loadingStage" :progress="progressPercentage" />
    </template>
    <template v-else-if="error">
      <Message severity="error" :closable="false" class="mb-4">{{
        error
      }}</Message>
      <Button label="처음으로 돌아가기" @click="goToHome" class="mt-4" />
    </template>
    <template v-else>
      <GeneratedPost :content="generatedPost" />
      <div class="flex justify-center gap-4 mt-4">
        <Button
          label="포스트 복사하기"
          @click="copyPost"
          class="p-button-primary"
        />
        <Button
          label="다시 생성하기"
          @click="regeneratePost"
          class="p-button-info"
        />
      </div>
    </template>
    <Toast position="bottom-center" group="bc" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useRouter } from "vue-router";
import GeneratedPost from "../components/GeneratedPost.vue";
import LoadingComponent from "../components/LoadingComponent.vue";
import Button from "primevue/button";
import Message from "primevue/message";
import Toast from "primevue/toast";
import { usePostGeneration } from "../composables/usePostGeneration";

export default defineComponent({
  name: "ResultPage",
  components: {
    GeneratedPost,
    LoadingComponent,
    Button,
    Message,
    Toast,
  },
  setup() {
    const router = useRouter();
    const {
      isLoading,
      loadingStage,
      error,
      generatedPost,
      copyPost,
      generatePost,
      regeneratePost,
      progressPercentage,
    } = usePostGeneration();

    onMounted(async () => {
      await generatePost();
    });

    const goToHome = () => {
      router.push("/");
    };

    return {
      isLoading,
      loadingStage,
      error,
      generatedPost,
      copyPost,
      regeneratePost,
      progressPercentage,
      goToHome,
    };
  },
});
</script>
