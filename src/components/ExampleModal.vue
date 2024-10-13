<template>
  <Dialog
    :visible="visible"
    :style="{ width: '90%', maxWidth: '600px' }"
    :modal="true"
    :closable="false"
    :header="isEditing ? '게시글 예시 수정' : '게시글 예시 등록'"
  >
    <div class="p-fluid p-4">
      <div class="field">
        <label for="content" class="font-bold mb-2 block">내용</label>
        <Textarea
          id="content"
          v-model="content"
          rows="8"
          autoResize
          class="w-full"
        />
      </div>
    </div>
    <template #footer>
      <div class="flex justify-between w-full px-4 pb-4">
        <Button
          label="취소"
          icon="pi pi-times"
          @click="close"
          class="p-button-text"
        />
        <Button label="저장" icon="pi pi-check" @click="save" autofocus />
      </div>
    </template>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import Textarea from "primevue/textarea";

export default defineComponent({
  name: "ExampleModal",
  components: {
    Dialog,
    Button,
    Textarea,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    initialContent: {
      type: String,
      default: "",
    },
    isEditing: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:visible", "save"],
  setup(props, { emit }) {
    const content = ref(props.initialContent);

    watch(
      () => props.visible,
      (newVisible) => {
        if (newVisible) {
          content.value = props.initialContent;
        }
      }
    );

    const close = () => {
      emit("update:visible", false);
    };

    const save = () => {
      emit("save", content.value);
      close();
    };

    return {
      content,
      close,
      save,
    };
  },
});
</script>
