export default (axios) => ({
  signup(userInfo) {
    return axios.post("/signup", userInfo);
  },
  login(credentials) {
    return axios.post("/login", credentials);
  },
  logout() {
    return axios.post("/logout");
  },
});
