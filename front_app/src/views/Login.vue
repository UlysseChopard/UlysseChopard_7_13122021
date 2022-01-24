<template>
    <v-container class="d-flex justify-center">
        <v-row justify="center" align="center" position="center center">
            <v-col cols="12">
            <v-form>
                <v-container fluid>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field label="Adresse mail" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field label="Mot de passe" />
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import CenterTemplate from "@/components/CenterTemplate.vue";

export default {
    name: "Login",
    components: {
        CenterTemplate
    },
    data() {
        return {
            formValid: false
        }
    }
}
</script>