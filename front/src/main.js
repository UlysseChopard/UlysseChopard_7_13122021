import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./router";
import store from "./store";
import socketIO from "./websocket";

loadFonts();

createApp(App)
  .use(store)
  .use(router)
  .use(vuetify)
  .use(socketIO(store))
  .mount("#app");
