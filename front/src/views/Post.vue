<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-btn flat to="/news">Retour</v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-textarea
        rows="4"
        clearable
        autofocus
        placeholder="Que voulez-vous partager ?"
        v-model="content"
        >Test</v-textarea
      >
    </v-row>
    <v-row justify="center">
      <v-col cols="4">
        <v-dialog scrollable>
          <template #activator="{ props }">
            <v-btn v-bind="props">Ajouter un GIF</v-btn>
          </template>
          <GifDialog />
        </v-dialog>
      </v-col>
      <v-col cols="4">
        <v-btn @click="createPost">Poster</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import GifDialog from "../components/posts/GifDialog.vue";

const store = useStore();

const content = ref("");

const createPost = () => {
  store.dispatch("posts/createPost", { content: content.value });
};
</script>
