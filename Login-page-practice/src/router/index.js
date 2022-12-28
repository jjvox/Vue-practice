import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignInView from "../views/SignInView";
import store from "@/store";
import { getRefreshToken } from "@/services/login";
import UserView from "@/views/UserView";
import UsersView from "@/views/UsersView";
import NotFound from "@/views/NotFound";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      requireAuth: true,
    },
    // beforeEnter: (to, from, next) => {  // 지역등록
    //   // beforeEnter로 컴포넌트 진입 전에 수행. to는 어디로 가는지, from은 어디서 왔는지, next는 어떤실행을 할지 정한다. ()
    //   const isLogin = store.getters.isLogin;
    //   if (isLogin) {
    //     return next();
    //   }
    //   alert("로그인을 해야 합니다.");
    //   return next("/login");
    // },
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
  {
    path: "/users",
    name: "users",
    component: UsersView,
  },
  {
    path: "/users/:id",
    name: "users",
    component: UserView,
  },
  {
    path: "/signIn",
    name: "signIn",
    component: SignInView,
  },
  {
    path: "/notfound",
    component: NotFound,
  },
  {
    path: "*", // 위에서부터 쭈욱 확인 해도 해당하는 경로가 없는 모든 경우에 404 NotFound 페이지를 보여준다.
    redirect: "/notfound",
  },
];

const router = new VueRouter({
  // 위에서 정의 한 routes를 옵션으로 한 router 인스턴스.(main.js 에 연결)
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  // 클라이언튼가 페이지에 접근 할때 로그인이 되어 있는지 여부를 바로 체크 (세부 페이지에 접근 하기 전에 전역적으로 먼저 한번 체크를 한다.)
  // 전역등록.
  const accessToken =
    Vue.$cookies.get("accessToken") || store.state.accessToken;
  const refreshToken =
    Vue.$cookies.get("refreshToken") || store.state.accessToken;

  if (to.meta.requireAuth && !accessToken && refreshToken) {
    // 로그인을 했던적이 있는 유저 (refresh토큰은 살아 있고 access토큰은 만료 된 상태)
    await getRefreshToken();
  }

  if (to.meta.requireAuth && !refreshToken) {
    // 로그인을 하지 않은 유저
    next("/login");
    return;
  }
  console.log(store.state);
  next();
});

export default router;
