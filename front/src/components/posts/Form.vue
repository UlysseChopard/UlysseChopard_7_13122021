<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-textarea
          clearable
          autofocus
          placeholder="Que voulez-vous partager ?"
          v-model="content"
        />
      </v-col>
      <v-col v-show="isGifSelection" cols="12" md="6">
        <p>GIF selection</p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="2" md="1">
        <v-btn icon color="primary" @click="isGifSelection = !isGifSelection"
          ><v-icon :icon="mdiFileGifBox"
        /></v-btn>
      </v-col>
      <v-col cols="2" md="1">
        <input
          style="display: none"
          type="file"
          accept="image/png, image/jpeg"
          ref="fileInput"
        />
        <v-btn icon color="secondary" @click="$refs.fileInput.click()">
          <v-icon :icon="mdiCamera" />
        </v-btn>
      </v-col>
    </v-row>
    <v-spacer />
    <v-row justify="space-around">
      <v-col cols="6" md="1">
        <v-btn flat to="/news">Retour</v-btn>
      </v-col>
      <v-col cols="6" md="1">
        <v-btn color="green" text-color="white" @click="createPost"
          >Poster</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { mdiCamera, mdiFileGifBox } from "@mdi/js";

const store = useStore();

const content = ref("");

const isFileInput = ref(false);

const isGifSelection = ref(false);

const createPost = () => {
  const formData = new FormData();
  formData.append("content", content.value);
  store.dispatch("posts/createPost", formData);
};
</script>
