import axios from "./axios_instance.js";

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
};
