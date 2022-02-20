<template>
  <v-app>
    <AppBar />
    <v-main>
      <router-view />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script setup>
import AppFooter from "@/components/app/Footer.vue";
import AppBar from "@/components/app/Bar.vue";
</script>
