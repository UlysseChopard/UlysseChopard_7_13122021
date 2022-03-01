<template>
  <v-card>
    <v-card-img>
      <v-img src="/icon.svg" />
    </v-card-img>
    <v-card-text>
      <v-container fluid fill-height>
        <v-row justify="center">
          <v-card-title>
            <span class="text-h5">Inscription</span>
          </v-card-title>
        </v-row>
        <v-row justify="center">
          <v-col cols="10" md="5">
            <v-text-field
              label="Prénom"
              v-model.lazy.trim="user.firstname"
              required
            />
          </v-col>
          <v-col cols="10" md="5">
            <v-text-field
              label="Nom"
              v-model.lazy.trim="user.lastname"
              required
            />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10">
            <v-text-field
              label="Adresse mail"
              v-model.lazy.trim="user.email"
              suffix="@groupomania.com"
              required
            />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10">
            <v-text-field
              label="Mot de passe"
              v-model="user.password"
              type="password"
              required
            />
          </v-col>
        </v-row>
        <v-row
          justify="center"
          v-if="$route.params.isModerator === 'moderator'"
        >
          <v-col cols="10">
            <v-text-field
              label="Code modérateur"
              v-model="user.moderatorCode"
              type="password"
              required
            />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10" md="5">
            <small>Tous les champs sont requis.</small>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-container fluid fill-height>
        <v-row justify="center">
          <v-col cols="8" md="6">
            <v-btn
              block
              color="green-darken-1"
              class="text-white"
              @click="signup"
              >S'inscrire</v-btn
            >
          </v-col>
        </v-row>
        <v-row justify="space-between">
          <v-col cols="auto">
            <v-btn density="compact" variant="text" to="/">Retour</v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn to="/login" density="compact" variant="text">
              J'ai déjà un compte
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { reactive } from "vue";
import { useStore } from "vuex";

const user = reactive({
  email: "",
  firstname: "",
  lastname: "",
  password: "",
  moderatorCode: "",
});

const store = useStore();

const signup = () => store.dispatch("user/signup", user);
</script>
