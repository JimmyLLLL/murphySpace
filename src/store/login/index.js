export default {
  state: {
    userData: null
  },
  mutations: {
    CHANGE_LOGIN_STATUS(state, payload) {
      state.userData = payload.userData ? payload.userData : null;
    },
    CHANGE_AVATOR(state, payload) {
      state.userData.avator = payload.avator;
    }
  },
  getters: {},
  actions: {
    changeLoginStatus({ commit }, payload) {
      payload.userData.avator &&
        (payload.userData.avator =
          "http://www.jinmylam.xin:8003/uploads/avator/" +
          payload.userData.avator);
      commit("CHANGE_LOGIN_STATUS", payload);
    },
    changeAvator({ commit }, payload) {
      commit("CHANGE_AVATOR", payload);
    }
  }
};
