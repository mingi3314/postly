<template>
  <Card
    :pt="{
      root: {
        class:
          'max-w-[470px] w-full mx-auto bg-surface-0 dark:bg-surface-900 border border-surface-300 dark:border-surface-700 rounded-lg font-sans overflow-hidden',
      },
      body: { class: 'p-0' },
      content: { class: 'p-0' },
      header: { class: 'p-0 bg-transparent' },
    }"
  >
    <template #header>
      <div class="flex items-center justify-between py-2 px-3">
        <div class="flex items-center">
          <Avatar
            icon="pi pi-user"
            class="mr-3 bg-surface-200 dark:bg-surface-700"
            size="normal"
            shape="circle"
          />
          <span class="font-semibold text-sm text-surface-800">username</span>
        </div>
        <i class="pi pi-ellipsis-h text-surface-500 text-lg cursor-pointer"></i>
      </div>
    </template>
    <template #content>
      <div
        class="w-full aspect-square bg-surface-100 dark:bg-surface-800"
      ></div>
      <div class="p-3">
        <div class="flex items-center text-2xl pb-2">
          <i class="pi pi-heart mr-4 cursor-pointer"></i>
          <i class="pi pi-comment mr-4 cursor-pointer"></i>
          <i class="pi pi-send mr-4 cursor-pointer"></i>
          <i class="pi pi-bookmark ml-auto cursor-pointer"></i>
        </div>
        <p class="font-semibold text-sm pb-1">1,235 likes</p>
        <p class="text-sm leading-5">
          <span class="font-semibold mr-1">username</span>
          {{ content }}
        </p>
        <p
          class="text-sm text-surface-500 dark:text-surface-400 pt-1 cursor-pointer"
        >
          View all 123 comments
        </p>
        <p class="text-[10px] text-surface-400 uppercase pt-2">2 HOURS AGO</p>
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Card from "primevue/card";
import Avatar from "primevue/avatar";

export default defineComponent({
  name: "GeneratedPost",
  components: {
    Card,
    Avatar,
  },
  props: {
    content: {
      type: String as PropType<string>,
      required: true,
    },
  },
});
</script>
