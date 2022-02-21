<template>
  <v-card>
    <v-card-title>Erreur 404</v-card-title>
    <v-card-text>
      Nous n'avons pas trouvé la page
      <strong>{{ $route.params.pathMatch.toString() }}</strong
      >. En cas de besoin, n'hésitez pas à contacter notre service client.
    </v-card-text>
  </v-card>
</template>
