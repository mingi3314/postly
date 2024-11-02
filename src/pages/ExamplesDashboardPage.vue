<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { usePostExampleStore } from "@/stores/postExampleStore";
import { useUserStore } from "@/stores/userStore";
import Button from "primevue/button";
import Panel from "primevue/panel";
import ExampleModal from "@/components/ExampleModal.vue";
import Menu from "primevue/menu";
import ConfirmPopup from "primevue/confirmpopup";
import { useConfirm } from "primevue/useconfirm";
import type { PostExample } from "@/types";

const postExampleStore = usePostExampleStore();
const userStore = useUserStore();
const modalVisible = ref(false);
const selectedExample = ref<PostExample>({
  id: "",
  user_id: "",
  content: "",
  created_at: "",
  updated_at: "",
});
const isEditing = ref(false);
const confirm = useConfirm();

const examples = computed(() => postExampleStore.examples);

onMounted(async () => {
  if (userStore.user) {
    await postExampleStore.fetchExamples(userStore.user.id);
  }
});

const openAddModal = () => {
  selectedExample.value = {
    id: "",
    user_id: "",
    content: "",
    created_at: "",
    updated_at: "",
  };
  isEditing.value = false;
  modalVisible.value = true;
};

const editExample = (example: PostExample) => {
  selectedExample.value = { ...example };
  isEditing.value = true;
  modalVisible.value = true;
};

const saveExample = async (content: string) => {
  if (userStore.user) {
    if (isEditing.value) {
      await postExampleStore.updateExample(selectedExample.value.id, content);
    } else {
      await postExampleStore.addExample(userStore.user.id, content);
    }
    modalVisible.value = false;
  }
};

const deleteExample = async (id: string) => {
  await postExampleStore.deleteExample(id);
};

const menu = ref();
const menuItems = ref([
  {
    label: "수정",
    icon: "pi pi-pencil",
    command: () => editExample(selectedExample.value),
  },
  {
    label: "삭제",
    icon: "pi pi-trash",
    command: (event: { originalEvent: { target: EventTarget } }) => {
      confirm.require({
        target: event.originalEvent.target as HTMLElement,
        message: "이 예시를 삭제하시겠습니까?",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          deleteExample(selectedExample.value.id);
        },
        reject: () => {
          // 아무 작업도 하지 않음
        },
      });
    },
  },
]);

const toggleMenu = (event: Event, exampleId: string) => {
  selectedExample.value =
    examples.value.find((e) => e.id === exampleId) || selectedExample.value;
  menu.value.toggle(event);
};
</script>

<template>
  <div class="container mx-auto px-4 py-8 min-h-screen flex flex-col max-w-3xl">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">게시글 예시 관리</h1>
      <Button
        label="새 예시 추가"
        icon="pi pi-plus"
        @click="openAddModal"
        class="p-button-primary"
      />
    </div>

    <div v-if="examples.length === 0" class="text-center text-gray-500 my-8">
      예시가 없습니다. 새로운 예시를 추가해보세요!
    </div>

    <div v-else class="space-y-4">
      <Panel
        v-for="(example, index) in examples"
        :key="example.id"
        :header="`예시 #${index + 1}`"
        :toggleable="true"
        class="mb-2"
      >
        <template #icons>
          <Button
            icon="pi pi-cog"
            text
            rounded
            aria-label="Settings"
            @click.stop="toggleMenu($event, example.id)"
          />
        </template>
        <p class="whitespace-pre-wrap text-sm">{{ example.content }}</p>
      </Panel>
    </div>

    <Menu ref="menu" :model="menuItems" :popup="true" />
    <ConfirmPopup></ConfirmPopup>

    <ExampleModal
      v-model:visible="modalVisible"
      :initial-content="selectedExample.content"
      :is-editing="isEditing"
      @save="saveExample"
    />
  </div>
</template>
