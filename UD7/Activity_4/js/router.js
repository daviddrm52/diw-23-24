import PostDisplay from "./components/PostDisplay.js";
import PostForm from "./components/PostForm.js";


let router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: [
        {path: '/', component: PostDisplay},
        {path: '/postDisplay', name: "PostDisplay", component: PostDisplay},
        {path: '/postForm', name: "PostForm", component: PostForm}
    ]
});

export default router;