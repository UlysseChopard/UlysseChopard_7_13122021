import router from "@/router";
import postsAPI from "@/api/posts.js";

const state = () => ({
  list: [],
});

const mutations = {
  add(state, post) {
    if (Array.isArray(post)) {
      return state.list.push(...post);
    }
    state.list.push(post);
  },
  update(state, posts) {
    state.list = posts;
  },
  modify(state, newPost) {
    const prevPostIdx = state.list.findIndex((post) => post.id === newPost.id);
    const mergedPosts = { ...state.list[prevPostIdx], ...newPost };
    state.list[prevPostIdx] = mergedPosts;
  },
  remove(state, id) {
    state.list = state.list.filter((post) => post.id !== id);
  },
};

const actions = {
  async create({ commit, dispatch }, formData) {
    try {
      const res = await postsAPI.create(formData);
      // commit("add", res.data);
      router.push("/news");
      dispatch(
        "notif/push_notif",
        { data: { message: "Post créé" }, type: "success" },
        {
          root: true,
        }
      );
    } catch (e) {
      dispatch("notif/push_notif", { data: e, type: "error" }, { root: true });
    }
  },
  async get({ commit, dispatch }) {
    try {
      const res = await postsAPI.get();
      commit("update", res.data);
    } catch (e) {
      dispatch("notif/push_notif", { data: e, type: "error" }, { root: true });
    }
  },
  async moderate({ commit, dispatch }, id) {
    try {
      const res = await postsAPI.moderate(id);
      commit("remove", id);
      dispatch("notif/push_notif", { data: res.data }, { root: true });
    } catch (e) {
      dispatch("notif/push_notif", { data: e, type: "error" }, { root: true });
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
