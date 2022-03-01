import userAPI from "@/api/user.js";
import router from "@/router";

const state = () => ({
  firstname: "",
  lastname: "",
  email: "",
  isAuth: false,
  role: "",
});

const mutations = {
  login(state, user) {
    state.firstname = user.firstname;
    state.lastname = user.lastname;
    state.email = user.email;
    state.isAuth = true;
    if (user?.role?.includes("moderator")) {
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
    user.email += "@groupomania.com";
    try {
      const res = await userAPI.signup(user);
      if (res.status < 200 || res.status >= 300) {
        throw res.data;
      }
      commit("login", res.data.user);
      router.push("/news");
      dispatch(
        "notif/push_notif",
        { data: res.data, type: "success" },
        { root: true }
      );
    } catch (e) {
      dispatch("notif/push_notif", { data: e, type: "error" }, { root: true });
    }
  },
  async login({ commit, dispatch }, user) {
    user.email += "@groupomania.com";
    try {
      const res = await userAPI.login(user);
      if (res.status < 200 || res.status >= 300) {
        throw res.data;
      }
      commit("login", res.data.user);
      router.push("/news");
      dispatch(
        "notif/push_notif",
        { data: res.data, type: "success" },
        { root: true }
      );
    } catch (e) {
      dispatch("notif/push_notif", { data: e, type: "error" }, { root: true });
    }
  },
  async logout({ commit, dispatch }) {
    try {
      const res = await userAPI.logout();
      if (res.status < 200 || res.status >= 300) {
        throw res.data;
      }
      commit("logout");
      router.push("/");
      dispatch(
        "notif/push_notif",
        { data: res.data, type: "success" },
        { root: true }
      );
    } catch (e) {
      dispatch("notif/push_notif", { data: e, type: "error" }, { root: true });
    }
  },
  async modify({ commit, dispatch }, data) {
    try {
      const res = await userAPI.modify(data);
      if (res.status >= 200 && res.status < 300) {
        commit("login", res.data.user);
      }
      dispatch(
        "notif/push_notif",
        { data: res.data, type: "success" },
        { root: true }
      );
    } catch (e) {
      dispatch("notif/push_notif", { data: e, type: "error" }, { root: true });
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
