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
    try {
      const res = await userAPI.signup(user);
      if (res.status < 200 || res.status >= 300) {
        throw res.data;
      }
      commit("login", res.data.user);
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
  async login({ commit, dispatch }, user) {
    try {
      const res = await userAPI.login(user);
      if (res.status < 200 || res.status >= 300) {
        throw res.data;
      }
      commit("login", res.data.user);
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
  async logout({ commit, dispatch }) {
    try {
      const res = await userAPI.logout();
      if (res.status < 200 || res.status >= 300) {
        throw res.data;
      }
      commit("logout");
      router.push("/home");
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
  async modifyPassword(
    { commit, dispatch, state },
    { prevPassword, password }
  ) {
    try {
      const verif = await userAPI.login({
        email: state.email,
        password: prevPassword,
      });
      if (verif.status < 200 || verif.status >= 300) {
        return dispatch(
          "push_notif",
          {
            data: {
              message: "This was not your previous password. Please retry",
            },
            type: "waning",
          },
          { root: true }
        );
      }
      const res = await userAPI.modify({ password });
      if (res.status >= 200 && res.status < 300) {
        commit("login", res.data.user);
      }
      dispatch(
        "notif/push_notif",
        { data: res.data, type: "error" },
        { root: true }
      );
    } catch (e) {
      dispatch("notif/push_notif", { data: e, type: "error" }, { root: true });
    }
  },
  async getSession({ commit, dispatch }) {
    try {
      const res = await userAPI.getSession();
      if (res.data?.user) {
        commit("login", res.data.user);
        dispatch(
          "notif/push_notif",
          { data: { message: "Reconnecté" }, type: "success" },
          { root: true }
        );
      }
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
