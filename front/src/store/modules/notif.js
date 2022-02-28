const state = () => ({
  list: [],
});

const mutations = {
  push_notif(state, notif) {
    state.list.push(notif);
  },
};

const actions = {
  push_notif({ commit }, { data, type = "info" }) {
    if (!data.message) {
      console.warn(`Data ${data} should contain a message field`);
    }
    commit("push_notif", {
      data,
      type,
      timestamp: Date.now(),
    });
  },
};

const getters = {
  lastNotif(state) {
    return state.state.pop();
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
