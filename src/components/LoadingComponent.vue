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
        <span class="text-2xl font-bold text-primary-500"
          >{{ progressPercentage }}%</span
        >
      </div>
    </div>
    <p class="mt-6 text-xl font-semibold text-primary-800">
      <span class="typing-effect">{{ displayedMessage }}</span>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, onUnmounted } from "vue";
import ProgressSpinner from "primevue/progressspinner";

export default defineComponent({
  name: "LoadingComponent",
  components: { ProgressSpinner },
  props: {
    stage: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const progress = ref(0);
    const loadingMessage = ref("");
    const displayedMessage = ref("");
    const progressPercentage = ref(0);

    const updateLoadingState = (stage: string) => {
      switch (stage) {
        case "references":
          progress.value = 33;
          loadingMessage.value = "참조 자료를 수집하는 중...";
          break;
        case "generating":
          progress.value = 66;
          loadingMessage.value = "포스트를 생성하는 중...";
          break;
        case "finalizing":
          progress.value = 100;
          loadingMessage.value = "최종 결과를 준비하는 중...";
          break;
        default:
          progress.value = 0;
          loadingMessage.value = "준비 중...";
      }
    };

    watch(() => props.stage, updateLoadingState, { immediate: true });

    // Typing effect
    let typingInterval: number;
    const startTypingEffect = () => {
      let i = 0;
      typingInterval = window.setInterval(() => {
        if (i <= loadingMessage.value.length) {
          displayedMessage.value = loadingMessage.value.slice(0, i);
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 50);
    };

    watch(loadingMessage, () => {
      clearInterval(typingInterval);
      startTypingEffect();
    });

    // Progress animation
    let progressInterval: number;
    const animateProgress = () => {
      progressInterval = window.setInterval(() => {
        if (progressPercentage.value < progress.value) {
          progressPercentage.value++;
        } else {
          clearInterval(progressInterval);
        }
      }, 20);
    };

    watch(progress, () => {
      clearInterval(progressInterval);
      animateProgress();
    });

    onMounted(() => {
      startTypingEffect();
      animateProgress();
    });

    onUnmounted(() => {
      clearInterval(typingInterval);
      clearInterval(progressInterval);
    });

    return {
      progress,
      loadingMessage,
      displayedMessage,
      progressPercentage,
    };
  },
});
</script>

<style scoped>
.typing-effect {
  border-right: 2px solid #000;
  animation: blink-caret 0.75s step-end infinite;
}

@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: #000;
  }
}
</style>
