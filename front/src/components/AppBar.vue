<template>
    <v-app-bar app>
      <v-spacer v-if="!displayAccountBtn" />
      <v-btn to="/">
        <img height="48" width="300" src="@/assets/logos/icon-left-font-monochrome-black.svg" alt="logo" />
      </v-btn>
      <v-spacer />
      <v-menu v-if="displayAccountBtn" anchor="bottom end" origin="auto" transition-slide-y>
        <template #activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon :icon="mdiAccountCircle"/>
          </v-btn>
        </template>
          <v-container>
              <v-row>
                <v-card>
                  <v-col cols="12">
                    <v-btn to="/account" block flat>Mon compte</v-btn>
                  </v-col>
                  <v-col cols="12">
                    <v-btn to="/" block flat>Me déconnecter</v-btn>
                  </v-col>
                </v-card>
              </v-row>
          </v-container>
      </v-menu>
    </v-app-bar>
</template>

<script setup>
import { watch, ref } from "vue";
import { useRoute } from "vue-router";
import { mdiAccountCircle } from "@mdi/js";

const displayAccountBtn = ref(false);

const route = useRoute();

watch(route, to => {
  if (to.path === "/news") {
    displayAccountBtn.value = true;
    return;
  }
  displayAccountBtn.value = false;
});
</script>