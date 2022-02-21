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
              <v-text-field label="Prénom" />
              <v-text-field label="Nom" />
              <v-text-field label="Adresse mail" />
            </v-card-text>
            <v-card-actions>
              <v-row justify="center">
                <v-btn>Enregistrer</v-btn>
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
              <v-text-field label="Mot de passe actuel" />
              <v-text-field label="Nouveau mot de passe" />
            </v-card-text>
            <v-card-actions>
              <v-row justify="center">
                <v-btn>Modifier le mot de passe</v-btn>
              </v-row>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
