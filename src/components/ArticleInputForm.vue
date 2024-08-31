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
  justify-content: space-between;
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
</style>
