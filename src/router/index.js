import { createRouter, createWebHistory } from "vue-router";
import routes from './rotues';
import store from '../store/index.js';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active",
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
});

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
} 

router.beforeEach((to, from, next) => {
  if (!getCookie('isLoggedIn')) {
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
