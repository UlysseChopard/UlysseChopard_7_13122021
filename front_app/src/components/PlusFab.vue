<template>
    <v-btn fab text icon>Test</v-btn>
    <v-speed-dial fab idx="plus">
        <v-sheet>
            <p>Test</p>
        </v-sheet>
        <template #activator idx="plus">
            <v-btn icon fab slot="activator"><v-icon :icon="icons.mdiPlusCircle" /></v-btn>
        </template>
    </v-speed-dial>
</template>
<script>
import { mdiCloseCircle, mdiPlusCircle } from "@mdi/js";

export default {
    name: "PlusFab",
    data() {
    return {
      icons: {
        mdiCloseCircle,
        mdiPlusCircle
      }
    }
  }
}
</script>