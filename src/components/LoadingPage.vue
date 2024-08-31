<template>
  <div class="loading-page">
    <p>기사를 변환 중입니다...</p>
    <LoadingSpinner />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import LoadingSpinner from "./LoadingSpinner.vue";
import { useArticleStore } from "../stores/articleStore"; // Import the store

export default defineComponent({
  components: { LoadingSpinner },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const articleStore = useArticleStore(); // Access the store

    onMounted(async () => {
      try {
        // Deserialize references from query parameters
        const references = JSON.parse(route.query.refs as string);

        // Use the store's generatePost action
        await articleStore.generatePost(references);

        // Navigate to the ResultPage, passing the generated post as a param
        router.push({
          name: "Result",
          params: { generatedPost: articleStore.generatedPost },
        });
      } catch (error) {
        console.error("Error generating post:", error);
        // Optionally, navigate to an error page or show a message
      }
    });

    return {};
  },
});
</script>
