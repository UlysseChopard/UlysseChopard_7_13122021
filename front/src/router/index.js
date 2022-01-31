import { createRouter, createWebHashHistory } from "vue-router";
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
    component: () => import("@/views/Auth.vue"),
    children: [
      {
        path: "/login",
        name: "Login",
        component: () => import("@/components/forms/LoginForm.vue"),
      },
      {
        path: "/signup/:isModerator?",
        name: "Signup",
        component: () => import("@/components/forms/SignupForm.vue"),
      },
      {
        path: "/account",
        name: "Account",
        component: () => import("@/components/forms/AccountForm.vue"),
      },
    ],
  },
  {
    path: "/news",
    name: "News",
    component: () => import("@/views/News.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
