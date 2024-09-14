<template>
  <div class="home-page">
    <h1>Post.ly</h1>
    <div class="search-container">
      <input
        v-model="topic"
        placeholder="주제를 입력해주세요..."
        class="search-input"
        @keyup.enter="generatePost"
      />
      <button
        class="btn btn-primary search-button"
        @click="generatePost"
        :disabled="!topic"
      >
        <i class="fas fa-search"></i>
      </button>
    </div>
    <p class="tagline">관련 뉴스를 찾아 포스트를 생성해드려요 ☺️</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useArticleStore } from "../stores/articleStore";

export default defineComponent({
  setup() {
    const topic = ref("");
    const router = useRouter();
    const articleStore = useArticleStore();

    const generatePost = async () => {
      if (topic.value.trim()) {
        await articleStore.setTopic(topic.value.trim());
        router.push("/loading");
      }
    };

    return { topic, generatePost };
  },
});
</script>

<style scoped>
.home-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 80vh;
}

.search-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  max-width: 400px;
  padding: 12px 20px;
  font-size: 18px;
  border: 2px solid var(--border-color);
  border-radius: 25px 0 0 25px;
  transition: all 0.3s ease;
  height: 48px;
  box-sizing: border-box;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 5px rgba(11, 5, 100, 0.3);
}

.search-button {
  padding: 0 20px;
  font-size: 18px;
  border-radius: 0 25px 25px 0;
  margin-left: -2px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tagline {
  font-size: 16px;
  color: #666;
  max-width: 400px;
  margin: 0 auto;
}

h1 {
  font-size: 28px;
  margin-bottom: 30px;
}

@media (max-width: 768px) {
  .search-container {
    flex-direction: row;
    align-items: center;
    max-width: 300px;
    margin: 0 auto 20px;
  }

  .search-input {
    width: calc(100% - 48px);
    max-width: none;
    border-radius: 25px 0 0 25px;
    margin: 0;
  }

  .search-button {
    width: 48px;
    max-width: none;
    border-radius: 0 25px 25px 0;
    margin: 0;
    padding: 0;
  }
}
</style>
