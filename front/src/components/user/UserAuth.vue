<template>
  <v-container fluid fill-height>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <component :is="form" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import UserAccount from "@/components/user/Account.vue";
import UserLogin from "@/components/user/Login.vue";
import UserSignup from "@/components/user/Signup.vue";

const form = ref(UserLogin);
</script>
