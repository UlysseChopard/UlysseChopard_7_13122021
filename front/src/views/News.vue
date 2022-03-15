<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="10" sm="6" md="8">
        <Post v-for="(post, idx) of posts" :key="idx" :post="post" />
      </v-col>
    </v-row>
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
