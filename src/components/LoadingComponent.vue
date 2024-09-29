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
import { defineComponent, ref, watch, onUnmounted } from "vue";
import ProgressSpinner from "primevue/progressspinner";

export default defineComponent({
  name: "LoadingComponent",
  components: { ProgressSpinner },
  props: {
    stage: {
      type: String as () => "references" | "generating" | "finalizing",
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

    const updateLoadingState = (stage: string) => {
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

    onUnmounted(() => {
      clearInterval(typingInterval);
    });

    return {
      displayedMessage,
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
