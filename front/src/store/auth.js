import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

const state = {
  firstname: "",
  lastname: "",
  email: "",
  isAuth: false,
  isModerator: false,
};

const mutations = {
  logIn(state, user) {
    state = { ...state, ...user, isAuth: true };
  },
  isModerator(state) {
    state.isModerator = true;
  },
  logOut(state) {
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
        if (res.status === 200) {
          commit("logIn", user);
          if (user.isModerator) {
            commit("isModerator");
          }
        }
      })
      .catch(console.error);
  },
  logout({ commit }) {
    axios
      .post("/logout")
      .then((res) => {
        if (res.status === 200) {
          commit("logOut");
        }
      })
      .catch(console.error);
  },
  login({ commit }, credentials) {
    axios
      .post("/login", credentials)
      .then((res) => {
        if (res.status === 200) {
          commit("logIn", credentials);
        }
      })
      .catch(console.error);
  },
};

export default {
  state,
  mutations,
  actions,
};
