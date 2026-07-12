import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    {
      path: "/weekday-trainer",
      component: () => import("./pages/WeekdayTrainer.vue"),
    },
  ],
});

export default router;
