<template>
  <v-img :alt="title" :src="images[size].url" />
</template>

<script setup>
defineProps({
  title: "",
  images: {},
  size: "",
});
</script>
