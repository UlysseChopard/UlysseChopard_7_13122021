<template>
  <v-container fluid>
    <v-container fluid>
      <v-row justify="center">
        <Post v-for="(post, idx) of posts" :key="idx" :post="post" />
      </v-row>
      <v-row justify="center">
        <v-btn variant="text" @click="getNewPosts">See more</v-btn>
      </v-row>
    </v-container>
    <AddContent />
  </v-container>
</template>

<script setup>
import Post from "@/components/posts/Post.vue";
import AddContent from "@/components/posts/AddContent.vue";
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();

const posts = computed(() => store.state.posts);

const getNewPosts = () => console.log("cliqué");
</script>
