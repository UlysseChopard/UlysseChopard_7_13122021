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
  modify(data) {
    return axios.put("/users", data);
  },
  remove() {
    return axios.delete("/users");
  },
};
