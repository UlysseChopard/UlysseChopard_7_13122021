import router from "@/router";
import postsAPI from "@/api/posts.js";

const state = () => ({
  list: [],
});

const mutations = {
  addPost(state, post) {
    if (Array.isArray(post)) {
      return state.list.push(...post);
    }
    state.list.push(post);
  },
  modifyPost(state, newPost) {
    const prevPostIdx = state.list.findIndex((post) => post.id === newPost.id);
    const mergedPosts = { ...state.list[prevPostIdx], ...newPost };
    state.list[prevPostIdx] = mergedPosts;
  },
};

const actions = {
  async createPost({ commit, dispatch }, content) {
    try {
      const res = await postsAPI.create(content);
      commit("addPost", res.data);
      router.push("/news");
      dispatch(
        "push_notif",
        {
          data: { message: "Post créé" },
          type: "success",
        },
        { root: true }
      );
    } catch (e) {
      dispatch("push_notif", { data: e, type: "error" }, { root: true });
    }
  },
  async getPosts({ commit, dispatch }) {
    try {
      const res = await postsAPI.get();
      commit("addPost", res.data);
      dispatch("push_notif", { data: res.data }, { root: true });
    } catch (e) {
      dispatch("push_notif", { data: e, type: "error" }, { root: true });
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
