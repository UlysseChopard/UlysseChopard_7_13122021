import { createStore } from "vuex";
import axios from "axios";
import auth from "./auth.js";

axios.defaults.baseURL = "http://localhost:3000";

export default createStore({
  state: () => ({
    user: {
      id: "",
      email: "",
      username: "",
      password: "",
    },
    posts: [],
    alerts: [],
  }),
  mutations: {
    modifyUser(state, user) {
      console.log("user", user);
      state.user = { ...state.user, ...user };
    },
    updatePosts(state, newPosts) {
      state.posts.push(...newPosts);
    },
    deletePost(state, id) {
      state.posts = state.posts.filter((post) => post.id !== id);
    },
    alert(state, alert) {
      state.alerts.push(alert);
    },
  },
  actions: {
    setUser({ commit }, username) {
      commit("username", username);
    },
    getNewPosts({ commit }) {
      const latest = [
        {
          id: 1,
          title: "Titre 1",
          content: "Mon texte 1",
          author: "JJGoldmann",
          pubDate: "30/01/2022",
        },
        {
          id: 2,
          title: "Titre 2",
          content: "Mon texte 2",
          author: "Johnny Halliday",
          pubDate: "01/01/2019",
        },
      ];
      commit("updatePosts", latest);
    },
    deletePost({ commit }, { id }) {
      if (!id) {
        commit("alert", "Post couldn't be removed, please retry");
      }
      const sendRequestOverNetwork = () => commit("removePost", id);
      const sendSuccessMsg = () => commit("alert", "Post successfully removed");
      sendRequestOverNetwork();
      sendSuccessMsg();
    },
  },
  modules: {
    auth,
  },
});
