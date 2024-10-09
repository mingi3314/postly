import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import ResultPage from "@/pages/ResultPage.vue";
import NewsSelectionPage from "@/pages/NewsSelectionPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import { useUserStore } from "@/stores/userStore";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/result",
    name: "Result",
    component: ResultPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/news-selection",
    name: "NewsSelection",
    component: NewsSelectionPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  await userStore.fetchUser();

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isLoggedIn = userStore.isLoggedIn;

  if (requiresAuth && !isLoggedIn) {
    next("/login");
  } else if (isLoggedIn && (to.name === "Login" || to.name === "Register")) {
    next("/");
  } else {
    next();
  }
});

export default router;
