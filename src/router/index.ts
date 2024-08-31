import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/HomePage.vue";
import LoadingPage from "../components/LoadingPage.vue";
import ResultPage from "../components/ResultPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/loading",
    name: "Loading",
    component: LoadingPage,
  },
  {
    path: "/result",
    name: "Result",
    component: ResultPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === "Result" && !from.name) {
    // Prevent direct navigation to the result page
    next("/");
  } else {
    next();
  }
});

export default router;
