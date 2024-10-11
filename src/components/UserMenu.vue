<template>
  <div v-if="isLoggedIn">
    <Menu :model="items">
      <template #button>
        <Button type="button" label="사용자 메뉴" icon="pi pi-user" />
      </template>
    </Menu>
  </div>
  <div v-else>
    <Button label="로그인" icon="pi pi-sign-in" @click="navigateToSignIn" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import Menu from "primevue/menu";
import Button from "primevue/button";

export default defineComponent({
  components: { Menu, Button },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();

    const isLoggedIn = computed(() => userStore.isLoggedIn);

    const items = [
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

    return { isLoggedIn, items, navigateToSignIn };
  },
});
</script>
