<template>
  <v-app>
    <AppBar />
    <v-main>
        <router-view />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script>
import AppFooter from "@/components/AppFooter.vue";
import AppBar from "@/components/AppBar.vue";

export default {
  name: "App",
  components: {
    AppFooter,
    AppBar
  },
  data: () => ({
    drawer: false,
    isConnected: false,
  }),
}
</script>