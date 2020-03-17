export default {
  state: {
    isLogin: false,
    userData: {}
  },
  mutations: {
    CHANGE_LOGIN_STATUS(state, payload) {
      console.log(state, payload);
      state.isLogin = payload.isLogin;
      state.userData = payload.isLogin ? payload.userData : {};
    }
  },
  getters: {},
  actions: {
    changeLoginStatus({ commit }, payload) {
      commit("CHANGE_LOGIN_STATUS", payload);
    }
  }
};
