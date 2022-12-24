import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    beforeEnter: (to, from, next) => {
      // beforeEnter로 컴포넌트 진입 전에 수행. to는 어디로 가는지, from은 어디서 왔는지, next는 어떤실행을 할지 정한다.
      const isLogin = false;
      if (isLogin) {
        return next();
      }
      alert("로그인을 해야 합니다.");
    },
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting  --> 빌드시 코드 분리해서 빌드됨.
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
