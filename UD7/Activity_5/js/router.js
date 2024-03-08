import PostList from "./components/PostList.js";
import PostForm from "./components/PostForm.js";

let router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: [
        {path: '/', name: "postlist", component: PostList},
        {path: '/newpost', name: "newpost", component: PostForm},
        {path: '/editpost', name: "editpost", component: PostForm}
    ]
});

export default router;