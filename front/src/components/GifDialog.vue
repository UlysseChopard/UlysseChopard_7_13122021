<template>
  <v-card>
    <v-card-text>
      <Gif
        v-for="(gif, idx) of gifs"
        :key="idx"
        :images="gif.images"
        :title="gif.title"
        size="fixed_height_downsampled"
        @click="addGifToPost(gif)"
      />
    </v-card-text>
  </v-card>
</template>

<script setup>
import axios from "axios";
import { onBeforeMount, ref } from "vue";
import Gif from "@/components/Gif.vue";

const gifs = ref([]);

onBeforeMount(async () => {
  const {
    data: { data: gifsArray },
  } = await axios.get(
    "https://api.giphy.com/v1/gifs/search?api_key=yFyMQEAHnCgHpFvcVhU3zKjqVALaj2Ox&q=test&limit=3&offset=0&rating=g&lang=fr"
  );
  gifs.value = gifsArray;
});

const addGifToPost = (gif) => {
  console.log(gif);
};
</script>
