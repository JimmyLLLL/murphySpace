// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Icon from "./components/icon.vue";
import "./element-conf.js";
import "./icon/index.js";
import App from "./App";
import router from "./router";
import "./style/index.css";
import store from "./store";
import api from "./api";
import animated from "animate.css";
Vue.use(animated);
import VueQuillEditor, { Quill } from "vue-quill-editor";
import ImageResize from "quill-image-resize-module"; //调节图片大小
Quill.register("modules/imageResize", ImageResize);
// require styles
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { handleDirective } from "./directive";
handleDirective(Vue);

Vue.use(VueQuillEditor /* { default global options } */);
Vue.component(Icon.name, Icon);

Vue.config.productionTip = false;
Vue.prototype.$api = api;

const orignalremoveItem = localStorage.removeItem;
localStorage.removeItem = function(key) {
  const clearItemEvent = new Event("clearItemEvent");
  clearItemEvent.key = key;
  window.dispatchEvent(clearItemEvent);
  orignalremoveItem.apply(this, arguments);
};

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
