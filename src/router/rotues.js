import HomeView from "../views/HomeView.vue";
import Register from "../components/Authentication/Register.vue";
import Login from "../components/Authentication/Login.vue";
import Menu from "../components/Menu/Menu.vue";
import Tables from "../components/Tables/Tables.vue";
import TableMenu from "../components/Menu/TableMenu.vue";
import Orders from "../components/Orders/Orders.vue";
import Users from '../components/AdminPanel/Users.vue';
import AdminMenuForUser from '../components/AdminPanel/AdminMenuForUser.vue';

export default [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/menu-create/:name",
      name: "menu-create",
      component: Menu,
    },
    {
      path: "/tables",
      name: "tables",
      component: Tables,
    },
    {
      path: "/menu/:userId/:tableId",
      name: "menu",
      component: TableMenu,
    },
    {
      path: "/orders",
      name: "orders",
      component: Orders,
    },
    {
      path: "/users",
      name: "users",
      component: Users,
    },
    {
      path: "/user-menu/:userId",
      name: "user-menu",
      component: AdminMenuForUser,
    },
  ];