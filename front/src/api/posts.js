import axios from "./axios_instance.js";

export default {
  getPosts() {
    return axios.get("/posts");
  },
  createPost(post) {
    console.log(post);
    if (!post.content && !post.image) {
      throw new Error(
        "Le post ne contient pas les champs attendus (content et/ou image)"
      );
    }
    return axios.post("/posts");
  },
};