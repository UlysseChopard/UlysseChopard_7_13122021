// Styles
import "vuetify/styles";

// Icons
import { aliases, mdi } from "vuetify/lib/iconsets/mdi-svg";

// Vuetify
import { createVuetify } from "vuetify";

export default createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
