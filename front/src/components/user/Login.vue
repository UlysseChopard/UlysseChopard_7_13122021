<template>
  <v-card>
    <v-card-img>
      <v-img src="/icon.svg" />
    </v-card-img>
    <v-card-text>
      <v-container fluid fill-height>
        <v-row justify="center">
          <v-card-title>
            <span class="text-h5">Connection</span>
          </v-card-title>
        </v-row>
        <v-row justify="center">
          <v-col cols="10">
            <v-text-field
              label="Adresse mail"
              v-model.lazy.trim="credentials.email"
              :rules="[isGroupomaniaEmail]"
              placeholder="jean.dupont@groupomania.com"
              required
            />
          </v-col>
          <v-col cols="10">
            <v-text-field
              label="Mot de passe"
              v-model.trim.lazy="credentials.password"
              type="password"
              autocomplete="current-password"
              required
            />
          </v-col>
          <v-col cols="10" md="5">
            <small>Tous les champs sont requis.</small>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-container fill-height fluid>
        <v-row justify="center">
          <v-col cols="8" md="6">
            <v-btn
              block
              color="green-darken-1"
              class="text-white"
              @click="login"
              >Se connecter</v-btn
            >
          </v-col>
          <v-col cols="10">
            <v-spacer />
          </v-col>
        </v-row>
        <v-row justify="space-between" cols="10">
          <v-col cols="auto">
            <v-btn density="compact" variant="text" to="/">Retour</v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn to="/signup" density="compact" variant="text">
              Créer un compte
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>
<script setup>
import { useStore } from "vuex";
import { reactive } from "vue";
import { isGroupomaniaEmail } from "./utils.js";

const credentials = reactive({
  password: "",
  email: "",
});

const store = useStore();

const login = () => store.dispatch("user/login", credentials);
</script>
