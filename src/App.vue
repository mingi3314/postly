<template>
  <div id="app">
    <div v-if="!isGenerating">
      <!-- 첫 번째 화면 -->
      <div class="title">
        <h1>변환할 기사의 내용을 입력하세요.</h1>
        <p>
          기사는 최대 3개, 각 기사 내용은 5,000자 이내로 입력할 수 있습니다.
        </p>
      </div>
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
      <button @click="generatePost">기사 변환하기</button>
    </div>

    <div v-else>
      <!-- 두 번째 화면 -->
      <div v-if="isLoading" class="loading">
        <p>기사를 변환 중입니다...</p>
        <!-- 로딩 애니메이션 -->
        <div class="spinner"></div>
      </div>
      <div v-else>
        <h1>변환된 기사 내용을 확인하세요.</h1>
        <p>실제로 어떻게 보일지 확인할 수 있어요.</p>
        <div class="generated-article">
          <p>{{ generatedPost }}</p>
        </div>
        <button class="btn_1" @click="reset">다시 변환하기</button>
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
@font-face {
  font-family: "S-CoreDream-3Light", "";
  src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

#app {
  margin: 80px 80px;
  font-family: "S-CoreDream-3Light";
  font-weight: normal;
  font-style: normal;
}

.title {
  width: 60%;
}

h1 {
  margin: 0;
}

p {
  margin: 8px 0 40px 0;
}

label {
  font-size: 16px;
  font-weight: 500;
}

.article-inputs {
  display: flex;
  justify-content: space-between;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.article-input {
  width: 30%;
}

textarea {
  width: 100%;
  height: 400px;
  margin-top: 8px;
  padding: 12px;
  font-size: 15px;
  border-color: #ddd;
  border-radius: 12px;
}

button {
  margin: 20px 0px;
  padding: 16px 48px;
  font-size: 16px;
  background-color: #0b0564;
  color: white;
  border: none;
  border-radius: 8px;
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

.btn_1 {
  margin-right: 16px;
  background-color: #a09eb0;
  color: #0b0564;
}
</style>
