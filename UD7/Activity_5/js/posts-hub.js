//Import components
import headerPosts from "./components/Header.js";
import footerPosts from "./components/Footer.js";
import postDisplay from "./components/PostDisplay.js";
import postList from "./components/PostList.js"
import postForm from "./components/PostForm.js";

import router from "./router.js";

const App = Vue.createApp({
  data() {
    return {
      //posts array (this is for displaying the data in the page)
      posts: [],
      post: [],
      id: null,
    }
  },
  components: {
    //Components for the header & footer
    headerPosts,
    footerPosts,
    postList,
    postDisplay,
    postForm
  },
  methods: {
    getDataFromLocalStorage: function() {
      this.posts = JSON.parse(localStorage.getItem('posts')) || {};
      console.log(this.posts);
      //If there are posts stored, this will increment the id value to match the stored posts
      for(let k = 0; k < this.posts.length; k++){
        this.id = this.posts[k].id + 1;
      };
      this.$router.push("/");
    } 
  },
  created() {
    this.getDataFromLocalStorage();
  },
}).use(router).mount('#app');