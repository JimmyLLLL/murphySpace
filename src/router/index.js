import Vue from "vue";
import Router from "vue-router";
import Home from "../views/home/home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/loginDialog",
      name: "loginDialog",
      component: () => import("../components/loginDialog/loginDialog.vue")
    },
    {
      path: "/MySpace",
      name: "MySpace",
      component: () => import("../views/mySpace/MySpace.vue")
    },
    {
      path: "/Personal",
      name: "Personal",
      component: () => import("../views/personal/Personal.vue")
    },
    {
      path: "/BlogDetail",
      name: "BlogDetail",
      component: () => import("../components/blog/BlogDetail.vue")
    },
    {
      path: "/Writter",
      name: "Writter",
      component: () => import("../components/writter/writter.vue")
    }
  ]
});
