<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="10" sm="8" md="6">
        <v-card>
          <v-card-header>
            <v-card-header-text>{{ post.author }}</v-card-header-text>
            <v-btn v-if="isModerator" @click="deletePost"
              ><v-icon :icon="mdiCloseCircle"
            /></v-btn>
          </v-card-header>
          <v-card-title>{{ post.title }}</v-card-title>
          <v-card-subtitle>Publié le {{ post.pubDate }}</v-card-subtitle>
          <v-card-text>{{ post.content }}</v-card-text>
          <v-card-actions v-if="$store.state.user.isModerator">
            <v-btn flat>Modérer ce post</v-btn>
          </v-card-actions>
        </v-card>
        <v-img v-if="post?.image" :src="post.image" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { mdiCloseCircle } from "@mdi/js";
import { useStore } from "vuex";

const store = useStore();

defineProps({
  post: {
    type: Object,
    required: true,
  },
  isModerator: {
    type: Boolean,
    default: false,
  },
});

const deletePost = (post) => store.dispatch("deletePost", post);
</script>
