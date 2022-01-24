<template>
  <v-container>
    <CenterTemplate>
      <v-card v-for="i of 10" :key=i>
        <v-card-content>
          <v-card-title>{{ i }} poste</v-card-title>
        </v-card-content>
      </v-card>
    </CenterTemplate>
    <PlusFab />
  </v-container>
</template>

<script>
import CenterTemplate from "@/components/CenterTemplate.vue";
import PlusFab from "@/components/PlusFab.vue";

export default {
  name: 'Home',
  components: {
    CenterTemplate,
    PlusFab
  },
}
</script>
