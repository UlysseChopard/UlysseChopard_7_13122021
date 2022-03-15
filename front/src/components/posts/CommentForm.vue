<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-textarea v-model="content" />
        <v-file-input
          ref="fileInput"
          label="Charger une image"
          accept="image/*"
          v-model="file"
          v-show="file.length"
        />
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row justify="end">
            <v-btn :icon="mdiCamera" @click="uploadImg" />
            <v-btn :icon="mdiSend" @click="sendComment" />
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { mdiCamera, mdiSend } from "@mdi/js";
import { useStore } from "vuex";
import { ref, toRefs } from "vue";

const emit = defineEmits(["sendComment"]);

const props = defineProps({
  thread: 0,
});

const { thread } = toRefs(props);

const store = useStore();

const content = ref("");

const file = ref([]);

const fileInput = ref("fileInput");

const uploadImg = () => {
  if (file.value.length) {
    return (file.value = []);
  }
  fileInput.value.click();
};

const sendComment = () => {
  const post = new FormData();
  post.append("content", content.value);
  post.append("thread", thread.value);
  if (file.value.length > 0) {
    post.append("upload", file.value[0]);
  }
  store.dispatch("posts/create", { post, isComment: true });
  emit("sendComment");
};
</script>
