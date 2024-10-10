<template>
  <AuthForm
    title="회원가입"
    submitLabel="회원가입"
    footerLink="/signin"
    footerText="이미 계정이 있으신가요? 로그인"
    @submit="handleSignUp"
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

    const handleSignUp = async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      try {
        await userStore.register(email, password);
        router.push("/");
      } catch (error) {
        console.error("Sign up failed:", error);
        // TODO: Show error message to user
      }
    };

    return { handleSignUp };
  },
});
</script>
