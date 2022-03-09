<template>
  <v-container fluid>
    <v-container fluid>
      <v-row justify="center">
        <Post v-for="(post, idx) of posts" :key="idx" :post="post" />
      </v-row>
    </v-container>
    <AddContent />
  </v-container>
</template>

<script setup>
import Post from "@/components/posts/Post.vue";
import AddContent from "@/components/posts/AddContent.vue";
import { useStore } from "vuex";
import { computed, onBeforeMount } from "vue";

const store = useStore();

// Liste des posts renversée pour montrer les derniers posts en premier
const posts = computed(() => store.state.posts.list.reverse());

onBeforeMount(() => store.dispatch("posts/get"));
</script>
