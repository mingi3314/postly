<template>
  <div class="card">
    <DataTable :value="examples" responsiveLayout="scroll">
      <Column field="content" header="내용">
        <template #body="slotProps">
          <div class="truncate max-w-md">{{ slotProps.data.content }}</div>
        </template>
      </Column>
      <Column :exportable="false" style="min-width: 8rem">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            class="p-button-rounded p-button-success mr-2"
            @click="editExample(slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            class="p-button-rounded p-button-warning"
            @click="deleteExample(slotProps.data.id)"
          />
        </template>
      </Column>
    </DataTable>
    <Button
      label="새 예시 추가"
      icon="pi pi-plus"
      class="mt-4"
      @click="openAddModal"
    />
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
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import ExampleModal from "@/components/ExampleModal.vue";
import type { PostExample } from "@/types";

export default defineComponent({
  name: "ExamplesDashboard",
  components: {
    DataTable,
    Column,
    Button,
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
