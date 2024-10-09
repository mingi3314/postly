<template>
  <div id="app" class="flex flex-col min-h-screen">
    <header class="bg-surface-0 shadow-md p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold text-primary-800">Post.ly</h1>
        <UserMenu />
      </div>
    </header>
    <main class="flex-grow">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserMenu from "@/components/UserMenu.vue";
import "./assets/global.css";

export default defineComponent({
  name: "App",
  components: { UserMenu },
});
</script>

<style></style>
