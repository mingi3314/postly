<template>
  <div class="home-page">
    <h1>포스트 생성을 위한 글감을 입력하세요.</h1>
    <p>관심있는 주제나 키워드를 입력하면 자동으로 관련 뉴스를 검색합니다.</p>
    <input v-model="topic" placeholder="글감을 입력하세요" />
    <button class="btn btn-primary" @click="generatePost" :disabled="!topic">
      포스트 생성하기
    </button>
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
      if (topic.value) {
        await articleStore.setTopic(topic.value);
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
}

input {
  width: 100%;
  max-width: 300px;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  border: 1px solid var(--border-color);
  border-radius: 5px;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

p {
  margin-bottom: 20px;
}
</style>
