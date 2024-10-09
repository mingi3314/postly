<template>
  <div class="flex justify-center items-center h-screen bg-surface-100">
    <Card class="w-full max-w-md">
      <template #title>로그인</template>
      <template #content>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-surface-600"
              >이메일</label
            >
            <InputText id="email" v-model="email" type="email" class="w-full" />
          </div>
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-surface-600"
              >비밀번호</label
            >
            <Password
              id="password"
              v-model="password"
              :feedback="false"
              toggleMask
              class="w-full"
              inputClass="w-full"
            />
          </div>
          <Button type="submit" label="로그인" class="w-full" />
        </form>
      </template>
      <template #footer>
        <router-link to="/register" class="text-primary-600 hover:underline"
          >계정이 없으신가요? 회원가입</router-link
        >
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";

export default defineComponent({
  components: { Card, InputText, Password, Button },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const email = ref("");
    const password = ref("");

    const handleLogin = async () => {
      try {
        await userStore.login(email.value, password.value);
        router.push("/");
      } catch (error) {
        console.error("Login failed:", error);
        // TODO: Show error message to user
      }
    };

    return { email, password, handleLogin };
  },
});
</script>
