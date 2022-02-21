import { createStore } from "vuex";
import user from "./modules/user.js";
import posts from "./modules/posts.js";

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
  getters: {
    lastNotif(state) {
      return state.notif.pop();
    },
  },
  modules: {
    user,
    posts,
  },
});
