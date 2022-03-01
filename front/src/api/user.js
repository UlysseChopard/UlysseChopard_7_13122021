import axios from "./axios_config.js";

export default {
  signup(userInfo) {
    return axios.post("/signup", userInfo);
  },
  login(credentials) {
    return axios.post("/login", credentials);
  },
  logout() {
    return axios.post("/logout");
  },
  modify(infos) {
    return axios.put("/users", infos);
  },
};
