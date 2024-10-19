<template>
  <div class="container mx-auto px-4 py-8 min-h-screen flex flex-col max-w-3xl">
    <h1 class="text-3xl font-bold mb-6">게시글 예시 관리</h1>

    <div class="mb-8 flex justify-end">
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
            icon="pi pi-pencil"
            text
            rounded
            aria-label="Edit"
            @click.stop="editExample(example)"
          />
          <Button
            icon="pi pi-trash"
            severity="danger"
            text
            rounded
            aria-label="Delete"
            @click.stop="deleteExample(example.id)"
          />
        </template>
        <p class="whitespace-pre-wrap text-sm">{{ example.content }}</p>
      </Panel>
    </div>

    <ExampleModal
      v-model:visible="modalVisible"
      :initial-content="selectedExample.content"
      :is-editing="isEditing"
      @save="saveExample"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { useExampleStore } from "@/stores/exampleStore";
import { useUserStore } from "@/stores/userStore";
import Button from "primevue/button";
import Panel from "primevue/panel";
import ExampleModal from "@/components/ExampleModal.vue";
import type { PostExample } from "@/types";

export default defineComponent({
  name: "ExamplesDashboard",
  components: {
    Button,
    Panel,
    ExampleModal,
  },
  setup() {
    const exampleStore = useExampleStore();
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

    const examples = computed(() => exampleStore.examples);

    onMounted(async () => {
      if (userStore.user) {
        await exampleStore.fetchExamples(userStore.user.id);
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
          await exampleStore.updateExample(selectedExample.value.id, content);
        } else {
          await exampleStore.addExample(userStore.user.id, content);
        }
        modalVisible.value = false;
      }
    };

    const deleteExample = async (id: string) => {
      await exampleStore.deleteExample(id);
    };

    return {
      examples,
      modalVisible,
      selectedExample,
      isEditing,
      openAddModal,
      editExample,
      saveExample,
      deleteExample,
    };
  },
});
</script>
