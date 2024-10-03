<template>
  <div
    class="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 p-4"
    :class="{ 'border-primary-500': selected, 'border-gray-200': !selected }"
  >
    <h3 class="font-bold text-lg mb-2">{{ cleanTitle }}</h3>
    <p class="text-gray-600 text-sm mb-4">{{ cleanDescription }}</p>
    <div class="flex justify-between items-center">
      <a
        :href="newsItem.link"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary-600 hover:text-primary-800 transition-colors duration-300"
      >
        자세히 보기
      </a>
      <Button
        :icon="selected ? 'pi pi-check-square' : 'pi pi-square'"
        :class="{ 'p-button-outlined': !selected }"
        @click="$emit('toggle-selection', newsItem)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import Button from "primevue/button";
import type { NewsItem } from "../types";

export default defineComponent({
  name: "LinkPreview",
  components: { Button },
  props: {
    newsItem: {
      type: Object as PropType<NewsItem>,
      required: true,
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["toggle-selection"],
  setup(props) {
    const cleanTitle = computed(() => {
      return props.newsItem.title
        .replace(/<b>/g, "")
        .replace(/<\/b>/g, "")
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .trim();
    });

    const cleanDescription = computed(() => {
      return props.newsItem.description
        .replace(/<b>/g, "")
        .replace(/<\/b>/g, "")
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .trim();
    });

    return {
      cleanTitle,
      cleanDescription,
    };
  },
});
</script>
