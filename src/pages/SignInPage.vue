<template>
  <AuthForm
    title="로그인"
    submitLabel="로그인"
    footerLink="/signup"
    footerText="계정이 없으신가요? 회원가입"
    @submit="handleSignIn"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";
import AuthForm from "@/components/AuthForm.vue";

export default defineComponent({
  components: { AuthForm },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();

    const handleSignIn = async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      try {
        await userStore.login(email, password);
        router.push("/");
      } catch (error) {
        console.error("Sign in failed:", error);
        // TODO: Show error message to user
      }
    };

    return { handleSignIn };
  },
});
</script>
