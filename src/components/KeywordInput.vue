<template>
  <div class="w-full max-w-xl mb-6">
    <IconField class="w-full" :pt="{ root: 'relative w-full' }">
      <InputText
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        class="w-full keyword-input"
        @keyup.enter="$emit('generate')"
      />
      <InputIcon>
        <i class="pi pi-search search-icon" @click="$emit('generate')"></i>
      </InputIcon>
    </IconField>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";

export default defineComponent({
  components: {
    InputText,
    IconField,
    InputIcon,
  },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "키워드를 입력해주세요...",
    },
  },
  emits: ["update:modelValue", "generate"],
});
</script>

<style scoped>
.keyword-input {
  @apply flex-1 rounded-full h-14 w-full pl-6 pr-14 text-lg border-2 border-primary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 dark:focus:ring-primary-400/50;
}

.search-icon {
  @apply absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl text-primary-500 cursor-pointer hover:text-primary-600;
}
</style>
