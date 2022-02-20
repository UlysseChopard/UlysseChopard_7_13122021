<template>
  <v-alert
    :model-value="displayAlert"
    fixed
    class="bottom-center"
    :type="alert.type"
    closable
    >{{ alert.data.message }}</v-alert
  >
</template>

<script setup>
import { onMounted, ref } from "vue";

defineProps(["alert"]);

const displayAlert = ref(true);

onMounted(() => {
  setTimeout(() => (displayAlert.value = false), 3000);
});
</script>

<style>
.bottom-center {
  bottom: 48px;
  left: 5%;
  right: 5%;
  z-index: 1;
}
</style>
