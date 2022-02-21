<template>
  <v-alert
    :model-value="displayAlert"
    fixed
    class="bottom-center"
    :type="type"
    >{{ message }}</v-alert
  >
</template>

<script setup>
import { onMounted, ref } from "vue";

defineProps({
  message: "",
  type: "",
});

const displayAlert = ref(true);

onMounted(() => {
  setTimeout(() => (displayAlert.value = false), 3000);
});
</script>

<style>
.bottom-center {
  bottom: 100px;
  left: 5%;
  right: 5%;
  z-index: 10;
}
</style>
