import { createRouter, createWebHashHistory } from "vue-router";
import store from "../store";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import("@/views/User.vue"),
    children: [
      {
        path: "/login",
        name: "Login",
        component: () => import("@/components/user/Login.vue"),
        meta: {
          guest: true,
        },
      },
      {
        path: "/signup/:isModerator?",
        name: "Signup",
        component: () => import("@/components/user/Signup.vue"),
        meta: {
          guest: true,
        },
      },
      {
        path: "/account",
        name: "Account",
        component: () => import("@/components/user/Account.vue"),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/news",
    name: "News",
    component: () => import("@/views/News.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/post",
    name: "Post",
    component: () => import("@/views/Post.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from) => {
  console.log("state", store.state);
  const isAuth = store.state.user.isAuth;

  if (to.meta.requiresAuth && !isAuth) {
    return "/login";
  }
  if (to.meta.guest && isAuth) {
    return "/news";
  }
});

export default router;
