<script setup lang="ts">
import UserMenu from "@/components/UserMenu.vue";
import "./assets/global.css";
</script>

<template>
  <div id="app" class="flex flex-col min-h-screen">
    <header class="bg-surface-0 shadow-md py-2 px-4">
      <div class="container mx-auto flex justify-between items-center">
        <router-link
          to="/"
          class="text-xl font-bold text-primary-800 hover:text-primary-600 transition-colors"
        >
          Post.ly
        </router-link>
        <UserMenu />
      </div>
    </header>
    <main class="flex-grow">
      <router-view />
    </main>
  </div>
</template>

<style></style>
