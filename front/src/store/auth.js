import axios from "axios";
import router from "../router";

axios.defaults.baseURL = "http://localhost:3000";

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
  signup({ commit }, user) {
    axios
      .post("/signup", user)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          commit("login", res.data.user);
          router.push("/news");
        } else {
          throw new Error("Unable to signup");
        }
      })
      .catch(console.error);
  },
  logout({ commit }) {
    axios
      .post("/logout")
      .then((res) => commit("logout"))
      .catch(console.error);
  },
  login({ commit }, credentials) {
    axios
      .post("/login", credentials)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          commit("login", res.data.user);
          router.push("/news");
        } else {
          throw new Error("Unable to login");
        }
      })
      .catch(console.error);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
