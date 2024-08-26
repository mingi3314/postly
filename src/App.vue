<template>
  <div id="app">
    <div v-if="!isGenerating">
      <!-- 첫 번째 화면 -->
      <h1>변환할 기사의 내용을 입력하세요.</h1>
      <p>기사는 최대 3개, 각 기사 내용은 5,000자 이내로 입력할 수 있습니다.</p>
      <div class="article-inputs">
        <div
          v-for="(reference, index) in references"
          :key="index"
          class="article-input"
        >
          <label :for="'reference' + index">기사{{ index + 1 }}</label>
          <textarea
            v-model="reference.text"
            :placeholder="'기사' + (index + 1) + ' 내용을 입력하세요.'"
            maxlength="5000"
          ></textarea>
        </div>
      </div>
      <button @click="generatePost">3개의 기사 변환하기</button>
    </div>

    <div v-else>
      <!-- 두 번째 화면 -->
      <div v-if="isLoading" class="loading">
        <p>기사를 변환 중입니다...</p>
        <!-- 로딩 애니메이션 -->
        <div class="spinner"></div>
      </div>
      <div v-else>
        <h2>변환된 기사 내용을 확인하세요.</h2>
        <div class="generated-article">
          <p>{{ generatedPost }}</p>
        </div>
        <button @click="reset">다시 변환하기</button>
        <button @click="copyPost">기사 복사하기</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { generatePost } from "./langchain";

export default defineComponent({
  setup() {
    const references = ref([{ text: "" }, { text: "" }, { text: "" }]);
    const generatedPost = ref("");
    const isGenerating = ref(false);
    const isLoading = ref(true);

    const generatePostHandler = async () => {
      isGenerating.value = true;
      isLoading.value = true;
      const validReferences = references.value.filter(
        (ref) => ref.text.trim() !== ""
      );
      if (validReferences.length > 0) {
        generatedPost.value = await generatePost(validReferences);
      }
      isLoading.value = false;
    };

    const reset = () => {
      isGenerating.value = false;
      references.value.forEach((ref) => (ref.text = ""));
    };

    const copyPost = () => {
      navigator.clipboard.writeText(generatedPost.value);
      alert("기사가 복사되었습니다.");
    };

    return {
      references,
      generatedPost,
      isGenerating,
      isLoading,
      generatePost: generatePostHandler,
      reset,
      copyPost,
    };
  },
});
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin: 40px;
}

.article-inputs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.article-input {
  width: 30%;
}

textarea {
  width: 100%;
  height: 150px;
  margin-top: 10px;
}

button {
  margin: 20px 10px;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* 로딩 애니메이션 스타일 */
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
}

.spinner {
  border: 6px solid #ccc;
  border-top: 6px solid #42b983;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.generated-article {
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  max-width: 600px;
  text-align: left;
}
</style>
