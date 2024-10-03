import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import ResultPage from "../pages/ResultPage.vue";
import NewsSelectionPage from "../pages/NewsSelectionPage.vue";

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
  },
  {
    path: "/news-selection",
    name: "NewsSelection",
    component: NewsSelectionPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if ((to.name === "Result" || to.name === "NewsSelection") && !from.name) {
    // Prevent direct navigation to the result or news selection page
    next("/");
  } else {
    next();
  }
});

export default router;
