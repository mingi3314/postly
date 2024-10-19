<script setup lang="ts">
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "키워드를 입력해주세요...",
  },
});

const emit = defineEmits(["update:modelValue", "generate"]);

const updateModelValue = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>

<template>
  <div class="w-full max-w-xl mb-6">
    <IconField class="w-full" :pt="{ root: 'relative w-full' }">
      <InputText
        :value="props.modelValue"
        @input="updateModelValue"
        :placeholder="props.placeholder"
        class="w-full flex-1 rounded-full h-14 pl-6 pr-14 text-lg border-2 border-primary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 dark:focus:ring-primary-400/50"
        @keyup.enter="$emit('generate')"
      />
      <InputIcon>
        <i
          class="pi pi-search absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl text-primary-500 cursor-pointer hover:text-primary-600"
          @click="$emit('generate')"
        ></i>
      </InputIcon>
    </IconField>
  </div>
</template>
