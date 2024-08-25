<template>
  <div id="app">
    <h1>Postly - Instagram Magazine Post Generator</h1>
    <div v-for="(reference, index) in references" :key="index">
      <textarea
        v-model="reference.text"
        placeholder="Enter reference text"
      ></textarea>
    </div>
    <button @click="addReference">Add Reference</button>
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

export default defineComponent({
  setup() {
    const references = ref([{ text: "" }]);
    const generatedPost = ref("");

    const addReference = () => {
      if (references.value.length < 5) {
        references.value.push({ text: "" });
      }
    };

    const generatePostHandler = async () => {
      const texts = references.value
        .map((ref) => ref.text)
        .filter((text) => text.trim() !== "");
      if (texts.length > 0) {
        generatedPost.value = await generatePost(texts);
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
