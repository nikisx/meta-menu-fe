import { createRouter, createWebHistory } from "vue-router";
import routes from './rotues';
import store from '../store/index.js';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  if (!localStorage.getItem("user")) {
    if ((to.name === 'menu-create' || to.name === 'tables' || to.name === 'users'  || to.name === 'orders'  || to.name === 'statistics') ) {
      next({name: 'login'});
    } 
    else{
      next();
    }
  }
  else{
    next();
  }
 
})

export default router;
