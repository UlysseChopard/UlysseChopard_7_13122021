<template>
  <v-card>
    <v-card-text v-for="(gif, idx) of gifs" :key="idx">
      <v-img
        :alt="gif.title"
        :src="gif.images[GIF_SIZE].url"
        @click="addGifToPost(gif)"
      />
    </v-card-text>
  </v-card>
</template>

<script setup>
import axios from "axios";
import { onBeforeMount, ref } from "vue";

const GIF_SIZE = "fixed_height_downsampled";

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
