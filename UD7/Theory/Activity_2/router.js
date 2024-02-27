import Hello from "./Hello.js";
import Goodbye from "./Goodbye.js";

const Home = { template: '<div> Home </div>'};

let router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: [
        {path: '/', name: "Home", component: Home},
        {path: '/hello/:message', name: "Hello", component: Hello},
        {path: '/bye', name: "Hello", component: Goodbye},
    ]
});

export default router;
