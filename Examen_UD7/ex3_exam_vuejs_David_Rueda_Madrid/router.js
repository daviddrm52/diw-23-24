import Login from "./Login.js";
import User from "./User.js";

let router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: [
    {path: "/login", name: "login", component: Login},
    {path: "/user", name: "user", component: User}
  ]
});

export default router