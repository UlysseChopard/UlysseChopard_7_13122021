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
    component: () => import("@/components/posts/Form.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from) => {
  const isAuth = store.state.user.isAuth;

  if (to.meta.requiresAuth && !isAuth) {
    store.dispatch("push_notif", {
      data: {
        message: "This page requires authentication",
      },
      type: "warning",
    });
    return "/login";
  }

  if (to.name === "NotFound") {
    store.dispatch("push_notif", {
      data: {
        message: `La page ${to.params.pathMatch} n'existe pas ou a été retirée. N'hésitez pas à contacter notre service client en cas de besoin.`,
      },
    });
    return false;
  }
});

export default router;
