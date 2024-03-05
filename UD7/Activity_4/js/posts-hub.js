//Import components
import headerPosts from "./components/Header.js";
import footerPosts from "./components/Footer.js";
import postDisplay from "./components/PostDisplay.js";
import postForm from "./components/PostForm.js";

// import router from "./router.js";

const { createApp } = Vue;

createApp({
  data() {
    return {
      //posts array (this is for displaying the data in the page)
      posts: [],
      //For the mandatory inputs
      // titleError: '',
      // authorError: '',
      // imageError: '',
      // // //Information inside the posts array
      // id: 1,
      // title: null,
      // briefSummary: null,
      // postContent: null,
      // author: null,
      // image: null,
      // postStatus: null,
      // editing: false,
      // url: null,
      //Where the results of a search will be stored (to edit the post and other things)
      // result: [],
    }
  },
  components: {
    //Components for the header & footer
    headerPosts,
    footerPosts,
    postDisplay,
    postForm

  },
  methods: {
    updatePostDisplay: function(){
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
      console.log("All data was updated successfully");
    },
    editPost: function(postId){ /* Works */
      //editPost will put the values of the post that we want to modify into the values of the form, and store the info in the result variable that is in the return
      console.log("Editing post...");
      console.log(postId);
      this.result = this.posts.find(({id}) => id === postId);
      this.$refs.PostForm.updateEditPostForm(this.result); 
    },
    deletePost: function(postId){ /* Works deleting the post in the array & localStorage */
      console.log("Deleting post...");
      for (let k = 0; k < this.posts.length; k++){
        console.log(this.posts[k].id);
        if(this.posts[k].id == postId){
          this.posts.splice(k, 1);
          localStorage.removeItem(postId);
          break;
        };
      };
      console.log(this.posts);
    },
  },
  mounted() {
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
  },
}).mount('#app');