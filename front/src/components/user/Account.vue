<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-btn flat @click="$router.back()">Retour</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="10">
        <v-card>
          <v-container fluid>
            <v-card-text>
              <v-text-field
                label="Prénom"
                :placeholder="prevFirstname"
                v-model="firstname"
              />
              <v-text-field
                label="Nom"
                :placeholder="prevLastname"
                v-model="lastname"
              />
            </v-card-text>
            <v-card-actions>
              <v-row justify="center">
                <v-btn @click="modifyUser">Enregistrer</v-btn>
              </v-row>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="10">
        <v-card>
          <v-container fluid>
            <v-card-text>
              <v-text-field
                label="Mot de passe actuel"
                type="password"
                v-model="prevPassword"
                autocomplete="current-password"
              />
              <v-text-field
                label="Nouveau mot de passe"
                type="password"
                v-model="password"
                autocomplete="new-password"
              />
            </v-card-text>
            <v-card-actions>
              <v-row justify="center">
                <v-btn @click="modifyPassword">Modifier le mot de passe</v-btn>
              </v-row>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const prevFirstname = computed(() => store.state.user.firstname);
const prevLastname = computed(() => store.state.user.lastname);
const prevPassword = ref("");
const password = ref("");

const firstname = ref(prevFirstname.value);
const lastname = ref(prevLastname.value);

const modifyUser = () =>
  store.dispatch("user/modify", {
    firstname: firstname.value,
    lastname: lastname.value,
  });

const modifyPassword = () =>
  store.dispatch("user/modify", {
    prevPassword: prevPassword.value,
    password: password.value,
  });
</script>
