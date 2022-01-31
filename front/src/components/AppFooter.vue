<template>
  <v-footer class="bg-grey-lighten-1" app>
      <v-row no-gutters justify="center">
        <v-btn v-for="link of links" :key="link" :to="link.to" variant="text" color="white" class="mx-2">{{ link.title }}</v-btn>
        <v-col class="text-center text-white mt-4" cols="12">
          {{ new Date().getFullYear() }} - <strong>OpenClassrooms</strong>
        </v-col> 
      </v-row>
    </v-footer>
</template>
<script>
export default {
    name: "AppFooter",
    data() {
        return {
            links: [
                {
                    title: "About us",
                    to: "/"
                },
                {
                    title: "Services"
                },
                {
                    title: "Contact us"
                },
                {
                    title: "Blog"
                }
            ]
        }
    }
}
</script>