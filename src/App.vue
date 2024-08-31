<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
export default {
  name: "App",
};
</script>

<style>
/* Retain the necessary styles */
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

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
}
</style>
