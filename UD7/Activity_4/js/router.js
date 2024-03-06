import PostList from "./components/PostList.js";
import PostForm from "./components/PostForm.js";

let router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: [
        {path: '/postList', name: "PostList", component: PostList},
        {path: '/postForm', name: "PostForm", component: PostForm}
    ]
});

export default router;