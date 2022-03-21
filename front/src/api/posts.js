import axios from "./axios_config.js";

export default {
  get(id) {
    return axios.get(`/posts${id ? "/" + id : ""}`);
  },
  create(post) {
    return axios.post("/posts", post, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  modify(id, post) {
    return axios.put(`/posts/${id}`, post, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  moderate(id) {
    return axios.put(`/posts/moderator/${id}`);
  },
  remove(id) {
    return axios.delete(`/posts/${id}`);
  },
};
