<template>
  <v-app-bar app density="compact">
    <v-app-bar-nav-icon @click="$emit('switchDrawer')" />
    <v-img
      max-height="36"
      min-width="200"
      src="/icon-left-font-monochrome-black.svg"
      alt="logo"
    />
  </v-app-bar>
</template>

<script setup />
