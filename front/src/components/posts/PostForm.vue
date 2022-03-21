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
import postAPI from "@/api/posts";

const props = defineProps(["id"]);

const id = toRef(props, "id");

const router = useRouter();

const store = useStore();

const content = ref("");

const fileInput = ref("fileInput");

const file = ref([]);

const image = ref("");

if (id.value) {
  postAPI.get(id.value).then((res) => {
    image.value = res.data.image;
    content.value = res.data.content;
  });
}

const isFileInput = ref(false);

const isGifSelection = ref(false);

const createPost = () => {
  const post = new FormData();
  post.append("content", content.value);
  if (file.value.length > 0) {
    post.append("upload", file.value[0]);
  } else if (image.value) {
    post.append("image", image.value);
  }

  if (id.value) {
    store
      .dispatch("posts/modify", { post, id: id.value })
      .then(() => router.push("/"));
  } else {
    store.dispatch("posts/create", { post }).then(() => router.push("/"));
  }
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
