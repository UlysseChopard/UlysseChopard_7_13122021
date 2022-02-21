<template>
  <v-app>
    <Bar @switch-drawer="drawer = !drawer" />
    <Drawer :drawer="drawer" />
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
    <Footer />
    <Notif
      v-for="notif of $store.state.notif"
      :key="notif.timestamp"
      :message="notif.data.message"
      :type="notif.type"
    />
    {{ $store.state.notif }}
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import Footer from "@/components/app/Footer.vue";
import Bar from "@/components/app/Bar.vue";
import Drawer from "@/components/app/Drawer.vue";
import Notif from "@/components/app/Notif.vue";

const drawer = ref(null);
</script>
