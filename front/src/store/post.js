const state = () => ({
  list: [],
});

const mutations = {
  addPost(state, post) {
    state.list.push(post);
  },
  removePost(state, id) {
    state.list = state.list.filter((post) => post.id !== id);
  },
  modifyPost(state, newPost) {
    const prevPostIdx = state.list.findIndex((post) => post.id === newPost.id);
    const mergedPosts = { ...state.list[prevPostIdx], ...newPost };
    state.list[prevPostIdx] = mergedPosts;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
