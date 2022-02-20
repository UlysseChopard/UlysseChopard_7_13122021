import { createStore } from "vuex";
import auth from "./modules/auth.js";
import post from "./modules/post.js";

export default createStore({
  state() {
    return {
      notif: [],
    };
  },
  mutations: {
    push_notif(state, notif) {
      state.notif.push(notif);
    },
  },
  actions: {
    push_notif({ commit }, { data, type = "info" }) {
      if (!data.message) {
        console.warn(`Data ${data} should contain a message field`);
      }
      commit("push_notif", {
        data,
        type,
        timestamp: Date.now(),
      });
    },
  },
  modules: {
    auth,
    post,
  },
});
