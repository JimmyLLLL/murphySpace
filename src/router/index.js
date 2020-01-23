import Vue from "vue";
import Router from "vue-router";
import home from "../views/home/home.vue";
import MySpace from "../views/mySpace/MySpace.vue";
import Personal from "../views/personal/Personal.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: home
    },
    {
      path: "/MySpace",
      name: "MySpace",
      component: MySpace
    },
    {
      path: "/Personal",
      name: "Personal",
      component: Personal
    }
  ]
});
