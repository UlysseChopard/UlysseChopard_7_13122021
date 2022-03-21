<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-textarea
          clearable
          autofocus
          no-resize
          label="Que voulez-vous partager ?"
          v-model="content"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col v-show="isGifSelection" cols="12" md="6">
        <p>GIF selection</p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col v-show="isFileInput" cols="12" md="6">
        <v-file-input
          ref="fileInput"
          label="Charger une image"
          accept="image/*"
          v-model="file"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="2" md="1">
        <v-btn
          :icon="mdiFileGifBox"
          color="primary"
          @click="isGifSelection = !isGifSelection"
          title="GIF"
        />
      </v-col>
      <v-col cols="2" md="1">
        <v-btn
          :icon="mdiCamera"
          color="secondary"
          @click="openFileInput"
          title="Image"
          >Charger une image</v-btn
        >
      </v-col>
    </v-row>
    <v-spacer />
    <v-row justify="space-around">
      <v-col cols="6" md="1">
        <v-btn flat to="/">Retour</v-btn>
      </v-col>
      <v-col cols="6" md="1">
        <v-btn color="green-darken-3" text-color="white" @click="createPost"
          >Poster</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, toRef } from "vue";
import { useStore } from "vuex";
import { mdiCamera, mdiFileGifBox } from "@mdi/js";
import { useRouter } from "vue-router";

const router = useRouter();

console.log(router.props.id);

const store = useStore();

const content = ref("");

const fileInput = ref("fileInput");

const file = ref([]);

const isFileInput = ref(false);

const isGifSelection = ref(false);

const createPost = () => {
  const post = new FormData();
  post.append("content", content.value);
  if (file.value.length > 0) {
    post.append("upload", file.value[0]);
  }
  store.dispatch("posts/create", { post }).then(() => router.push("/"));
};

const openFileInput = () => {
  isFileInput.value = !isFileInput.value;
  if (isFileInput.value) {
    fileInput.value.click();
  } else {
    file.value = [];
  }
};
</script>
