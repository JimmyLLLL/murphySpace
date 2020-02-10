import blogSingle from "./blogSingle";
import login from "./login";
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    blogSingle,
    login
  }
});
