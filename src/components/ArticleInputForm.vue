<template>
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
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "ArticleInputForm",
  props: {
    references: {
      type: Array as PropType<{ text: string }[]>,
      required: true,
    },
  },
});
</script>

<style scoped>
.article-inputs {
  display: flex;
  flex-direction: column;
}

.article-input {
  width: 100%;
  margin-bottom: 20px;
}

textarea {
  width: 100%;
  height: 200px;
  margin-top: 8px;
  padding: 12px;
  font-size: 14px;
  border-color: #ddd;
  border-radius: 12px;
}

@media (min-width: 768px) {
  .article-inputs {
    flex-direction: row;
    justify-content: space-between;
  }

  .article-input {
    width: 30%;
    margin-bottom: 0;
  }

  textarea {
    height: 400px;
    font-size: 15px;
  }
}
</style>
