<script setup lang="ts">
import { ref, computed } from "vue";
import Panel from "primevue/panel";
import Textarea from "primevue/textarea";
import Button from "primevue/button";

const emit = defineEmits(["generate"]);

const texts = ref([""]);

const panelPt = {
  root: {
    class: "shadow-md rounded-lg overflow-hidden border border-surface-200",
  },
  header: { class: "bg-surface-50 p-4 border-b border-surface-200" },
  content: { class: "bg-white" },
  toggleableContent: { class: "transition-all duration-300 ease-in-out" },
};

const textareaPt = {
  root: {
    class:
      "w-full p-3 border border-surface-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200",
  },
};

const buttonPt = {
  root: {
    class:
      "bg-primary-600 hover:bg-primary-700 text-primary-50 font-bold px-6 py-3 rounded-md transition-colors duration-200 shadow-md hover:shadow-lg",
  },
};

const addText = () => {
  if (texts.value.length < 5) {
    texts.value.push("");
  }
};

const removeText = (index: number) => {
  texts.value.splice(index, 1);
};

const isValid = computed(() => texts.value.some((text) => text.trim() !== ""));

const generatePost = () => {
  if (isValid.value) {
    emit(
      "generate",
      texts.value.filter((text) => text.trim() !== "")
    );
  }
};

const primaryButtonPt = buttonPt;
</script>

<template>
  <div class="w-full max-w-xl">
    <div v-for="(text, index) in texts" :key="index" class="mb-6">
      <Panel :toggleable="true" :pt="panelPt">
        <template #header>
          <div class="flex justify-between items-center w-full">
            <span class="text-lg font-semibold text-primary-800"
              >텍스트 소스 {{ index + 1 }}</span
            >
            <Button
              icon="pi pi-trash"
              @click="removeText(index)"
              severity="danger"
              text
              aria-label="삭제"
              :pt="{
                root: {
                  class:
                    'p-2 hover:bg-red-100 rounded-full transition-colors duration-200',
                },
              }"
            />
          </div>
        </template>
        <div class="p-4">
          <Textarea
            v-model="texts[index]"
            :autoResize="true"
            rows="5"
            placeholder="텍스트를 입력하거나 붙여넣기 하세요..."
            class="w-full mb-2"
            :pt="textareaPt"
          />
          <small class="text-surface-500 block text-right">
            {{ texts[index].length }} / 3000 글자
          </small>
        </div>
      </Panel>
    </div>
    <div class="flex justify-between items-center mt-6">
      <Button
        @click="addText"
        label="다른 텍스트 추가"
        icon="pi pi-plus"
        outlined
        :disabled="texts.length >= 5"
        :pt="primaryButtonPt"
      />
      <Button
        @click="generatePost"
        label="포스트 생성"
        icon="pi pi-file-edit"
        :disabled="!isValid"
        :pt="primaryButtonPt"
      />
    </div>
  </div>
</template>
