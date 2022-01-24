<template>
    <v-row align="center" justify="center">
        <v-col cols="3"></v-col>
        <v-col cols="6" align-self="center"><slot></slot></v-col>
        <v-col cols="3"></v-col>
    </v-row>
</template>
<script>
export default {
    name: "CenterTemplate"
}
</script>