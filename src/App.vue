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
  margin: 20px;
  font-family: "S-CoreDream-3Light";
  font-weight: normal;
  font-style: normal;
}

button {
  margin: 10px 0;
  padding: 12px 24px;
  font-size: 16px;
  background-color: #0b0564;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  max-width: 300px;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

@media (min-width: 768px) {
  #app {
    margin: 80px 80px;
  }

  button {
    width: auto;
    margin: 20px 0;
    padding: 16px 48px;
  }
}
</style>
