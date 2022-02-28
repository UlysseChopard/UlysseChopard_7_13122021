import { createStore } from "vuex";
import notif from "./modules/notif.js";
import user from "./modules/user.js";
import posts from "./modules/posts.js";

export default createStore({
  modules: {
    notif,
    user,
    posts,
  },
});
