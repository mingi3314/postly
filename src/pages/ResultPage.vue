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
      <Button label="다시 시도하기" @click="reset" class="mt-4" />
    </template>
    <template v-else>
      <GeneratedPost :content="generatedPost" />
      <div class="flex justify-center gap-4 mt-4">
        <Button label="처음으로" @click="reset" class="p-button-secondary" />
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
        <Button
          v-if="isLoggedIn"
          label="게시글 예시 등록"
          icon="pi pi-plus"
          @click="openExampleModal"
          class="p-button-success"
        />
      </div>
      <p v-if="isLoggedIn" class="text-center mt-4 text-sm text-gray-600">
        우상단의 "예시 관리" 버튼을 클릭하여 언제든지 예시를 관리할 수 있습니다.
      </p>
    </template>
    <ExampleModal
      v-model:visible="exampleModalVisible"
      :initial-content="generatedPost"
      @save="saveExample"
    />
    <Toast position="bottom-center" group="bc" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue";
import { useUserStore } from "../stores/userStore";
import { useExampleStore } from "../stores/exampleStore";
import GeneratedPost from "../components/GeneratedPost.vue";
import LoadingComponent from "../components/LoadingComponent.vue";
import ExampleModal from "../components/ExampleModal.vue";
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
    ExampleModal,
  },
  setup() {
    const userStore = useUserStore();
    const exampleStore = useExampleStore();
    const exampleModalVisible = ref(false);

    const {
      isLoading,
      loadingStage,
      error,
      generatedPost,
      reset,
      copyPost,
      generatePost,
      regeneratePost,
      progressPercentage,
    } = usePostGeneration();

    const isLoggedIn = computed(() => userStore.isLoggedIn);

    onMounted(async () => {
      await generatePost();
    });

    const openExampleModal = () => {
      exampleModalVisible.value = true;
    };

    const saveExample = async (content: string) => {
      if (isLoggedIn.value) {
        await exampleStore.addExample(userStore.user!.id, content);
        // Show success message
        Toast.add({
          severity: "success",
          summary: "성공",
          detail: "게시글 예시가 저장되었습니다.",
          life: 3000,
        });
      }
    };

    return {
      isLoading,
      loadingStage,
      error,
      generatedPost,
      reset,
      copyPost,
      regeneratePost,
      progressPercentage,
      isLoggedIn,
      exampleModalVisible,
      openExampleModal,
      saveExample,
    };
  },
});
</script>
