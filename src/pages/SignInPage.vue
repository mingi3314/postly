<template>
  <div>
    <AuthForm
      title="로그인"
      submitLabel="로그인"
      footerLink="/signup"
      footerText="계정이 없으신가요? 회원가입"
      @submit="handleSignIn"
    />
    <Toast position="top-right" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";
import { useToast } from "../composables/useToast";
import AuthForm from "@/components/AuthForm.vue";
import Toast from "primevue/toast";

export default defineComponent({
  components: { AuthForm, Toast },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const { showError } = useToast();

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
        showError("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
      }
    };

    return { handleSignIn };
  },
});
</script>
