<template>
  <v-app>
    <Bar @switch-drawer="drawer = !drawer" />
    <Drawer
      :drawer="drawer"
      @mouseover="openDrawer"
      @mouseleave="automaticallyCloseDrawer"
    />
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
    <Footer />
    <Notif
      v-for="notif of $store.state.notif.list"
      :key="notif.timestamp"
      :message="notif.data.message"
      :type="notif.type"
    />
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import Footer from "@/components/app/Footer.vue";
import Bar from "@/components/app/Bar.vue";
import Drawer from "@/components/app/Drawer.vue";
import Notif from "@/components/app/Notif.vue";

const drawer = ref(false);

// Drawer opened on click and automatically closed after the mouse spent 4 secs consecutives outside
let drawerTimeout;

const automaticallyCloseDrawer = () => {
  drawer.value = true;
  drawerTimeout = setTimeout(() => (drawer.value = false), 1500);
};

const openDrawer = () => {
  if (drawerTimeout) clearTimeout(drawerTimeout);
  drawer.value = true;
};
</script>
