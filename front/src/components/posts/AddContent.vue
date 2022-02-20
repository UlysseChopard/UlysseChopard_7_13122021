<template>
    <v-menu anchor="top center">
        <template #activator="{ props }">
            <v-btn color="orange-darken-2" text-color="white" icon class="fab" v-bind="props">+</v-btn>
        </template>
        <v-container fluid>
            <v-card>
                <v-btn text block flat>GIF</v-btn>
                <v-btn text block flat>Texte</v-btn>
            </v-card>
        </v-container>
    </v-menu>
</template>

<style scoped>
.v-btn.fab {
    position: fixed;
    bottom: 48px;
    right: 48px;
    z-index: 1000;
}
</style>