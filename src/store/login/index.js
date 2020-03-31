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
    },
    CHANGE_INFO(state, payload) {
      state.userData.nickname = payload.nickname;
      state.userData.word = payload.word;
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
    },
    changeInfo({ commit }, payload) {
      commit("CHANGE_INFO", payload);
    }
  }
};
