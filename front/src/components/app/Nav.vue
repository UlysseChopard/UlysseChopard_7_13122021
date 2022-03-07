<template>
  <v-list>
    <v-list-item to="/account">Mon compte</v-list-item>
    <v-list-item @click="logout">Déconnexion</v-list-item>
    <v-list-item to="/">Accueil</v-list-item>
  </v-list>
</template>

<script setup>
import { useStore } from "vuex";

const store = useStore();
const logout = () => store.dispatch("logout");
</script>
