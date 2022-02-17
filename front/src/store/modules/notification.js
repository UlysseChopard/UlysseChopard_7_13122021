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
      console.warn("Data", data, "should contain a field message");
    }
    const notif = { data, type, timeStamp: Date.now() };
    commit("push_notif", notif);
  },
};

export default {
  state,
  mutations,
  actions,
};
