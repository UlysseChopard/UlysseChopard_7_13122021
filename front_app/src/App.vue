<template>
  <v-app>
    <v-app-bar collapse-on-scroll app>
      <v-app-bar-nav-icon @click="drawer = !drawer"/>
      <v-spacer />
      <v-btn to="/">
        <img height="48" src="@/assets/logos/icon-left-font-monochrome-black.svg" alt="logo" />
      </v-btn>
      <v-spacer />
      <v-menu anchor="bottom right" position="right bottom" origin="top right" transition-slide-y collapse collapse-on-click>
        <template #activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon :icon="icons.mdiAccount"/>
          </v-btn>
        </template>
        <v-sheet ripple>
          <v-list>
            <v-list-item to="/">Mon compte</v-list-item>
            <v-list-item to="/">Déconnexion</v-list-item>
          </v-list>
        </v-sheet>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer class="d-flex flex-column" align="center" justify="space-around" v-model="drawer" app>
      <v-container class="d-flex flex-column justify-space-around align-center">
        <v-btn-toggle class="d-flex flex-column">
          <v-btn to="/login" class="pa-4 ma-2">Connection</v-btn>
          <v-btn to="/signup" class="pa-4 ma-2">Inscription</v-btn>
        </v-btn-toggle>
      </v-container>
    </v-navigation-drawer>
    <v-main>
        <router-view />
    </v-main>
    <v-footer class="bg-grey-lighten-1" app>
      <v-row justify="center" no-gutters>
        <v-btn v-for="link of links" :key="link" :to="link.to" variant="text" color="white" class="mx-2">{{ link.title }}</v-btn>
        <v-col class="text-center text-white mt-4" cols="12">
          {{ new Date().getFullYear() }} - <strong>OpenClassrooms</strong>
        </v-col> 
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import { mdiAccount } from "@mdi/js";

export default {
  name: "App",
  data: () => ({
    drawer: false,
    icons: {
      mdiAccount,
    },
    links: [
      {
        title: "About us",
        to: "/about"
      },
      {
        title: "Services"
      },
      {
        title: "Contact us"
      },
      {
        title: "Blog"
      }
    ]
  }),
}
</script>