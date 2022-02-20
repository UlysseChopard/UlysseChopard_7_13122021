import { userAPI } from "@/api";
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
  async login({ commit, dispatch }, userInfo) {
    try {
      const res = await (userInfo.firstname && userInfo.lastname
        ? userAPI.signup(userInfo)
        : userAPI.login(userInfo));
      console.log(res);
      if (res.status !== 200) {
        return dispatch("push_notif", { data: res.data, type: "warning" });
      }
      commit("login", res.data.user);
      router.push("/news");
      dispatch("push_notif", { data: res.data, type: "success" });
    } catch (e) {
      dispatch("push_notif", { data: e, type: "error" });
    }
  },
  async logout({ commit, dispatch }) {
    try {
      const res = await userAPI.logout();
      commit("logout");
      router.push("/");
      dispatch("push_notif", { data: res.data, type: "info" });
    } catch (e) {
      dispatch("push_notif", { data: e, type: "error" });
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
