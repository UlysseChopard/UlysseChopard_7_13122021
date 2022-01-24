<template>
    <v-form :valid="formValid">
        <v-container fluid>
            <v-row>
                <v-col cols="3">
                    <v-text-field label="Prénom" clearable/>
                </v-col>
                <v-col cols="3">
                    <v-text-field label="Nom" clearable/>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <v-text-field label="Adresse mail" clearable />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <v-text-field type="password" label="Mot de passe" clearable/>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <v-text-field type="password" label="Mot de passe" clearable />
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
import CenterTemplate from "@/components/CenterTemplate.vue";

export default {
    name: "Signup",
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