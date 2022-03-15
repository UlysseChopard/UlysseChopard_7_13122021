import router from "@/router";
import postsAPI from "@/api/posts.js";

const state = () => ({
  list: [],
});

const mutations = {
  updateComments(state, { comments, thread }) {
    state[thread] = comments;
  },
  update(state, posts) {
    state.list = posts;
  },
  initThread(state, thread) {
    state[thread] = [];
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
  async create({ dispatch }, { post, isComment = false }) {
    try {
      await postsAPI.create(post);
      dispatch("get");
      const message = isComment ? "Commentaire ajouté" : "Post créé";
      dispatch(
        "notif/push_notif",
        { data: { message }, type: "success" },
        {
          root: true,
        }
      );
    } catch (e) {
      dispatch("notif/push_notif", { data: e, type: "error" }, { root: true });
    }
  },
  async get({ state, commit, dispatch }) {
    try {
      const res = await postsAPI.get();
      const comments = {};
      const posts = [];
      res.data.forEach((post) => {
        if (post?.thread) {
          if (!state[post.thread]) {
            commit("initThread", post.thread);
          }
          if (!comments[post.thread]) {
            comments[post.thread] = [];
          }
          comments[post.thread].push(post);
        } else {
          posts.push(post);
        }
      });
      commit("update", posts);
      Object.entries(comments).forEach(([thread, comments]) => {
        console.log("thread", thread);
        commit("updateComments", { thread, comments });
      });
    } catch (e) {
      dispatch("notif/push_notif", { data: e, type: "error" }, { root: true });
    }
  },
  async moderate({ commit, dispatch }, id) {
    try {
      const res = await postsAPI.moderate(id);
      if (res.status >= 200 && res.status < 300) {
        commit("remove", id);
      }
      dispatch("get");
      dispatch("notif/push_notif", { data: res.data }, { root: true });
    } catch (e) {
      dispatch("notif/push_notif", { data: e, type: "error" }, { root: true });
    }
  },
  async remove({ commit, dispatch }, id) {
    try {
      const res = await postsAPI.remove(id);
      if (res.status >= 200 && res.status < 300) {
        commit("remove", id);
      }
      dispatch("get");
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
