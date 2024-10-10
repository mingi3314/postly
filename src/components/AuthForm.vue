<template>
  <div class="flex justify-center items-center h-screen bg-surface-100">
    <Card class="w-full max-w-md">
      <template #title>{{ title }}</template>
      <template #content>
        <form @submit.prevent="handleSubmit" class="space-y-4">
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
          <Button type="submit" :label="submitLabel" class="w-full" />
        </form>
      </template>
      <template #footer>
        <router-link :to="footerLink" class="text-primary-600 hover:underline">
          {{ footerText }}
        </router-link>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";

export default defineComponent({
  components: { Card, InputText, Password, Button },
  props: {
    title: {
      type: String,
      required: true,
    },
    submitLabel: {
      type: String,
      required: true,
    },
    footerLink: {
      type: String,
      required: true,
    },
    footerText: {
      type: String,
      required: true,
    },
  },
  emits: ["submit"],
  setup(props, { emit }) {
    const email = ref("");
    const password = ref("");

    const handleSubmit = () => {
      emit("submit", { email: email.value, password: password.value });
    };

    return { email, password, handleSubmit };
  },
});
</script>
