import axios from "./back.js";

export default {
  get() {
    return axios.get("/posts");
  },
  create(post) {
    console.log(post);
    if (!post.content && !post.image) {
      throw new Error(
        "Le post ne contient pas les champs attendus (content et/ou image)"
      );
    }
    return axios.post("/posts");
  },
};
