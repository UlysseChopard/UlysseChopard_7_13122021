import { createStore } from "vuex";
import axios from "axios";
import auth from "./auth.js";
import post from "./post.js";

axios.defaults.baseURL = "http://localhost:3000";

export default createStore({
  modules: {
    auth,
    post,
  },
});
