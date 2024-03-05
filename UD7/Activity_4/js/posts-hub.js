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
    updateEditPostForm: function(postResult){
      console.log(postResult);
      this.$refs.PostForm.updateEditPostForm(postResult);
    },
  },
  created() {
    console.log("mounted");
    //Retrieve the data from the localStorage
    var keys = Object.keys(localStorage);
    var i = keys.length;
    //Add the stored posts in the localStorage in to the posts array
    while(i--){
      this.posts.push(JSON.parse(localStorage.getItem(keys[i])));
    };
    //Sort the posts stored in the array by its "id"
    var c = "id";
    this.posts.sort((a, b) => {
      if(a[c] === b[c]){
        return 0;
      } else {
        return (a[c] < b[c]) ? -1 : 1;
      };
    });
    //If there are posts stored, this will increment the id value to match the stored posts
    for(let k = 0; k < this.posts.length; k++){
      this.id = this.posts[k].id + 1;
    };
    console.log("All data is available in display");
    console.log(this.posts);
    this.$router.push("/postList");
  },
}).use(router).mount('#app');