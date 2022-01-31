<template>
  <v-container fluid fill-height>
    <v-container fluid fill-height>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <h1>Bienvenue sur le réseau social de Groupomania</h1>
        </v-col>
      </v-row>
    </v-container>
    <v-divider />
    <v-container fluid fill-height>
      <v-row justify="center" align="center">
        <v-col cols="12" md="8">
          <p>Vous pouvez vous inscrire avec votre adresse professionnelle et partager ici des GIFs ou des textes avec vos collègues</p>
        </v-col>
        <v-col cols="12" md="4">
          <v-row justify="center">
            <v-col cols="10" md="6">
              <v-btn block color="primary" to="/login" >Me connecter</v-btn>
            </v-col>
            <v-col cols="10" md="6">
              <v-btn block color="secondary" text-color="white" to="/signup">M'inscrire</v-btn>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="10" md="12">
              <v-btn block flat color="tertiary" to="/signup/moderator">Espace modérateur</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
