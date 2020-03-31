export default {
  state: {
    offsetTop: 0,
    height: 0,
    width: 0
  },
  mutations: {
    CHANGE_OFFSET_TOP(state, payload) {
      state.offsetTop = payload;
    },
    CHANGE_AREA(state, payload) {
      state.height = payload.height;
      state.width = payload.width;
    }
  },
  getters: {},
  actions: {
    changeOffsetTop({ commit }, payload) {
      commit("CHANGE_OFFSET_TOP", payload);
    },
    changeArea({ commit }, payload) {
      commit("CHANGE_AREA", payload);
    }
  }
};
