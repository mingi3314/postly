<template>
  <div>
    <AuthForm
      title="회원가입"
      submitLabel="회원가입"
      footerLink="/signin"
      footerText="이미 계정이 있으신가요? 로그인"
      @submit="handleSignUp"
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
        showError(
          "회원가입에 실패했습니다. 문제가 계속되면 관리자에게 문의해주세요."
        );
      }
    };

    return { handleSignUp };
  },
});
</script>
