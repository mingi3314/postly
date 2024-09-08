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

/* 공통 스타일 유지 */
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
</style>
