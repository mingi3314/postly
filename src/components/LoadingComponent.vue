<template>
  <div
    class="flex flex-col items-center justify-center h-screen text-center bg-primary-50"
  >
    <div class="relative">
      <ProgressSpinner
        style="width: 100px; height: 100px"
        strokeWidth="4"
        fill="var(--surface-ground)"
        animationDuration=".5s"
      />
      <div class="absolute inset-0 flex items-center justify-center">
        <span class="text-2xl font-bold text-primary-500">{{ progress }}%</span>
      </div>
    </div>
    <p class="mt-6 text-xl font-semibold text-primary-800">
      <span class="typing-effect">{{ displayedMessage }}</span>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from "vue";
import ProgressSpinner from "primevue/progressspinner";
import type { LoadingStage } from "@/types";

export default defineComponent({
  name: "LoadingComponent",
  components: { ProgressSpinner },
  props: {
    stage: {
      type: String as () => LoadingStage,
      required: true,
    },
    progress: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const loadingMessage = ref("");
    const displayedMessage = ref("");

    const updateLoadingState = (stage: LoadingStage) => {
      switch (stage) {
        case "references":
          loadingMessage.value = "참조 자료를 수집하는 중...";
          break;
        case "generating":
          loadingMessage.value = "포스트를 생성하는 중...";
          break;
        case "finalizing":
          loadingMessage.value = "최종 결과를 준비하는 중...";
          break;
        default:
          loadingMessage.value = "준비 중...";
      }
      displayedMessage.value = loadingMessage.value;
    };

    // 초기 로딩 메시지 설정
    onMounted(() => {
      updateLoadingState(props.stage);
    });

    watch(
      () => props.stage,
      (newStage) => {
        updateLoadingState(newStage);
      }
    );

    return {
      displayedMessage,
    };
  },
});
</script>
