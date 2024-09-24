<template>
  <div class="flex flex-col items-center justify-center h-screen text-center">
    <ProgressSpinner />
    <p class="mt-4 text-primary-800">포스트를 생성 중입니다...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProgressSpinner from "primevue/progressspinner";

export default defineComponent({
  name: "LoadingComponent",
  components: { ProgressSpinner },
});
</script>
