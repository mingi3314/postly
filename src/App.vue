<template>
  <div id="app">
    <h1>Postly - Instagram Magazine Post Generator</h1>
    <div v-for="reference in references" :key="reference.id">
      <textarea
        v-model="reference.text"
        placeholder="Enter reference text"
      ></textarea>
    </div>
    <button @click="addReference" :disabled="references.length >= 5">
      Add Reference
    </button>
    <button @click="generatePost">Generate Post</button>

    <div v-if="generatedPost">
      <h2>Generated Post</h2>
      <p>{{ generatedPost }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { generatePost } from "./langchain";
import { v4 as uuidv4 } from "uuid"; // 고유 ID 생성을 위해 uuid 패키지 사용
import { Reference } from "./types"; // Reference 타입 import

export default defineComponent({
  setup() {
    const references = ref<Reference[]>([{ id: uuidv4(), text: "" }]); // Reference 타입의 배열로 선언

    const generatedPost = ref("");

    const addReference = () => {
      if (references.value.length < 5) {
        references.value.push({ id: uuidv4(), text: "" });
      }
    };

    const generatePostHandler = async () => {
      const validReferences = references.value.filter(
        (ref) => ref.text.trim() !== ""
      );
      if (validReferences.length > 0) {
        generatedPost.value = await generatePost(validReferences); // Reference 객체 배열 전달
      }
    };

    return {
      references,
      generatedPost,
      addReference,
      generatePost: generatePostHandler,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}

textarea {
  width: 80%;
  height: 100px;
  margin: 10px 0;
}

button {
  margin: 10px;
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
</style>
