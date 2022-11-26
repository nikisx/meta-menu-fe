import { createRouter, createWebHistory } from "vue-router";
import routes from './rotues'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});

export default router;
