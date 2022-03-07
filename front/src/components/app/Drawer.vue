<template>
  <v-navigation-drawer v-model="drawer" temporary>
    <v-list>
      <v-list-item @click="logout">Déconnexion</v-list-item>
      <v-list-item to="/account">Mon compte</v-list-item>
      <v-list-item to="/">Derniers posts</v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { useStore } from "vuex";

defineProps({
  drawer: false,
});

const store = useStore();

const logout = () => store.dispatch("user/logout");
</script>
