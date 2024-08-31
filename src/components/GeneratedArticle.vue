<template>
  <div class="generated-article">
    <p>{{ content }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "GeneratedArticle",
  props: {
    content: {
      type: String as PropType<string>,
      required: true,
    },
  },
});
</script>

<style scoped>
.generated-article {
  margin: 24px 0;
  padding: 12px;
  border: 1px solid #ddd;
  max-width: 360px;
  height: 400px;
  text-align: left;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 14px;
  border-radius: 12px;
}
</style>
