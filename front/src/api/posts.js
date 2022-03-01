import axios from "./axios_config.js";

export default {
  get() {
    return axios.get("/posts");
  },
  create(post) {
    return axios.post("/posts", post, {
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
