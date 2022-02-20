import router from "@/router";
import { postAPI } from "@/api";

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
      const res = await postAPI.create(content);
      commit("addPost", res.data);
      router.push("/news");
      dispatch("push_notif", {
        data: { message: "Post créé" },
        type: "success",
      });
    } catch (e) {
      dispatch("push_notif", { data: e, type: "error" });
    }
  },
  async getPosts({ commit, dispatch }) {
    try {
      const res = await postAPI.get();
      commit("addPost", res.data);
      dispatch("push_notif", { data: res.data });
    } catch (e) {
      dispatch("push_notif", { data: e, type: "error" });
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
