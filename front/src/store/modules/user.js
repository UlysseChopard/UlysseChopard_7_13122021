import userAPI from "@/api/user.js";
import router from "@/router";

const state = () => ({
  firstname: "",
  lastname: "",
  email: "",
  isAuth: false,
  isModerator: false,
});

const mutations = {
  login(state, user) {
    state.firstname = user.firstname;
    state.lastname = user.lastname;
    state.email = user.email;
    state.isAuth = true;
    if (user.roles.includes("moderator")) {
      state.isModerator = true;
    }
  },
  logout(state) {
    state.firstname = "";
    state.lastname = "";
    state.email = "";
    state.isAuth = false;
    state.isModerator = false;
  },
};

const actions = {
  async signup({ commit, dispatch }, user) {
    try {
      const res = await userAPI.signup(user);
      if (res.status !== 201) {
        throw res.data;
      }
      commit("login", res.data.user);
      dispatch(
        "push_notif",
        { data: res.data, type: "success" },
        { root: true }
      );
      router.push("/news");
    } catch (e) {
      dispatch("push_notif", { data: e, type: "error" }, { root: true });
    }
  },
  async login({ commit, dispatch }, user) {
    try {
      const res = await userAPI.login(user);
      if (res.status !== 200) {
        throw res.data;
      }
      commit("login", res.data.user);
      dispatch(
        "push_notif",
        { data: res.data, type: "success" },
        { root: true }
      );
      router.push("/news");
    } catch (e) {
      dispatch("push_notif", { data: e, type: "error" }, { root: true });
    }
  },
  async logout({ commit, dispatch }) {
    try {
      const res = await userAPI.logout();
      if (res.status !== 204) {
        throw res.data;
      }
      commit("logout");
      router.push("/");
      dispatch(
        "push_notif",
        { data: res.data, type: "success" },
        { root: true }
      );
    } catch (e) {
      dispatch("push_notif", { data: e, type: "error" }, { root: true });
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
