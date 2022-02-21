<template>
  <v-container fluid>
    <v-card>
      <v-card-text style="height: 300px">
        <v-row v-for="(gif, idx) of gifs">
          <v-img
            :key="idx"
            :alt="gif.title"
            :src="gif.images[GIF_SIZE].url"
            @click="addGifToPost(gif)"
          />
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import giphy from "@/external/giphy.js";
import { onBeforeMount, ref } from "vue";

const GIF_SIZE = "fixed_height_downsampled";

const gifs = ref([]);

onBeforeMount(async () => {
  const {
    data: { data: gifsArray },
  } = await giphy.getTrendingGIFs();
  gifs.value = gifsArray;
});

const addGifToPost = (gif) => {
  console.log(gif);
};
</script>
