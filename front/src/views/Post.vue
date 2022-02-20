<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="10">
        <v-textarea
          rows="4"
          clearable
          autofocus
          placeholder="Que voulez-vous partager ?"
          v-model="content"
          >Test</v-textarea
        >
        <v-container fluid>
          <v-row justify="space-between">
            <v-btn flat to="/news">Retour</v-btn>
            <v-dialog scrollable>
              <template #activator="{ props }">
                <v-btn v-bind="props">Ajouter un GIF</v-btn>
              </template>
              <GifDialog />
            </v-dialog>
            <v-btn @click="createPost">Poster</v-btn>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>
../components/posts/GifDialog.vue
<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import GifDialog from "../components/posts/GifDialog.vue";

const store = useStore();

const content = ref("");

const createPost = () => {
  store.dispatch("createPost", { content: content.value });
};
</script>
