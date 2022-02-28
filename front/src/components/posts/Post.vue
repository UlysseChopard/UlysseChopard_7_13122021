<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="10" sm="8" md="6">
        <v-card>
          <v-card-actions>
            <v-btn
              v-if="$store.state.user.isModerator"
              flat
              @click="moderatePost(post.id)"
              ><v-icon :icon="mdiCloseCircle"
            /></v-btn>
          </v-card-actions>
          <v-card-header>
            <v-card-header-text
              >{{ post.user.firstname }} {{ post.user.lastname }} le
              {{ new Date(post.createdAt).toLocaleDateString("fr-FR") }} à
              {{
                new Date(post.createdAt).toLocaleTimeString("fr-FR")
              }}</v-card-header-text
            >
          </v-card-header>
          <v-card-title>{{ post.title }}</v-card-title>
          <v-card-text>{{ post.content }}</v-card-text>
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
});

const moderatePost = (id) => store.dispatch("posts/moderate", id);
</script>
