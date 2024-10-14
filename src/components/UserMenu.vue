<template>
  <div>
    <template v-if="isLoggedIn">
      <Button
        type="button"
        icon="pi pi-user"
        class="p-button-text p-button-rounded"
        @click="toggle"
        aria-haspopup="true"
        aria-controls="overlay_menu"
        aria-label="사용자 메뉴"
      />
      <Menu ref="menu" :model="items" :popup="true" id="overlay_menu" />
    </template>
    <Button
      v-else
      label="로그인"
      icon="pi pi-sign-in"
      @click="navigateToSignIn"
      class="p-button-text"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import Menu from "primevue/menu";
import Button from "primevue/button";

export default defineComponent({
  components: { Menu, Button },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const menu = ref();

    const isLoggedIn = computed(() => userStore.isLoggedIn);

    const items = [
      {
        label: "예시 관리",
        icon: "pi pi-list",
        command: () => {
          router.push("/examples");
        },
      },
      {
        label: "로그아웃",
        icon: "pi pi-sign-out",
        command: async () => {
          await userStore.logout();
          router.push("/signin");
        },
      },
    ];

    const navigateToSignIn = () => {
      router.push("/signin");
    };

    const toggle = (event: Event) => {
      menu.value.toggle(event);
    };

    return { isLoggedIn, items, navigateToSignIn, menu, toggle };
  },
});
</script>
