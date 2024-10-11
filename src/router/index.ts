import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import ResultPage from "@/pages/ResultPage.vue";
import NewsSelectionPage from "@/pages/NewsSelectionPage.vue";
import SignInPage from "@/pages/SignInPage.vue";
import SignUpPage from "@/pages/SignUpPage.vue";
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
    meta: { requiresAuth: false },
  },
  {
    path: "/news-selection",
    name: "NewsSelection",
    component: NewsSelectionPage,
    meta: { requiresAuth: false },
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignInPage,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUpPage,
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
    next("/signin");
  } else if (isLoggedIn && (to.name === "SignIn" || to.name === "SignUp")) {
    next("/");
  } else {
    next();
  }
});

export default router;
