<template>
  <div class="container mx-auto px-4 py-8 min-h-screen flex flex-col max-w-3xl">
    <h1 class="text-3xl font-bold mb-6">뉴스 선택하기</h1>
    <div v-if="isLoading" class="flex-grow flex items-center justify-center">
      <div class="text-center -mt-16 md:-mt-24">
        <ProgressSpinner />
        <p class="mt-4">뉴스 기사를 불러오는 중...</p>
      </div>
    </div>
    <div v-else-if="error" class="text-red-500">
      {{ error }}
    </div>
    <div v-else class="flex flex-col h-[calc(100vh-200px)]">
      <div class="flex justify-between items-center mb-5">
        <p class="text-sm text-gray-600">
          {{ selectedItems.length }}/{{ MAX_NEWS_ITEMS }} 선택됨
        </p>
        <Button
          label="포스트 생성하기"
          icon="pi pi-file-edit"
          @click="generatePost"
          :disabled="selectedItems.length === 0"
        />
      </div>
      <div class="flex-grow overflow-y-auto mb-4">
        <div class="grid grid-cols-1 gap-4">
          <LinkPreview
            v-for="item in paginatedNewsItems"
            :key="item.link"
            :news-item="item"
            :selected="isSelected(item)"
            @toggle-selection="toggleSelection(item)"
          />
        </div>
      </div>
      <Paginator
        v-model:first="first"
        :rows="5"
        :total-records="newsItems.length"
        template="PrevPageLink PageLinks NextPageLink"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useArticleStore } from "../stores/articleStore";
import LinkPreview from "../components/LinkPreview.vue";
import Button from "primevue/button";
import ProgressSpinner from "primevue/progressspinner";
import Paginator from "primevue/paginator";
import type { NewsItem } from "../types";
import { MAX_NEWS_ITEMS } from "../../backend/config/newsConfig";

export default defineComponent({
  name: "NewsSelectionPage",
  components: { LinkPreview, Button, ProgressSpinner, Paginator },
  setup() {
    const router = useRouter();
    const articleStore = useArticleStore();
    const newsItems = ref<NewsItem[]>([]);
    const selectedItems = ref<NewsItem[]>([]);
    const isLoading = ref(true);
    const error = ref("");
    const first = ref(0);

    const paginatedNewsItems = computed(() => {
      const start = first.value;
      const end = start + 5;
      return newsItems.value.slice(start, end);
    });

    const isSelected = (item: NewsItem) =>
      selectedItems.value.some((i) => i.link === item.link);

    const toggleSelection = (item: NewsItem) => {
      const index = selectedItems.value.findIndex((i) => i.link === item.link);
      if (index === -1) {
        if (selectedItems.value.length < MAX_NEWS_ITEMS) {
          selectedItems.value.push(item);
        }
      } else {
        selectedItems.value.splice(index, 1);
      }
    };

    const generatePost = () => {
      articleStore.setSelectedNewsItems(selectedItems.value);
      router.push("/result");
    };

    const fetchNewsItems = async () => {
      try {
        newsItems.value = await articleStore.searchNews();
      } catch (e) {
        error.value =
          "뉴스 기사를 불러오는데 실패했습니다. 다시 시도해 주세요.";
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(fetchNewsItems);

    return {
      newsItems,
      selectedItems,
      isLoading,
      error,
      toggleSelection,
      generatePost,
      paginatedNewsItems,
      first,
      MAX_NEWS_ITEMS,
      isSelected,
    };
  },
});
</script>
