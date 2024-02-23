//Import components
import headerPosts from "./components/Header.js";
import footerPosts from "./components/Footer.js";
import postDisplay from "./components/PostDisplay.js";

const { createApp } = Vue;

createApp({
  data() {
    return {
      //posts array (this is for displaying the data in the page)
      posts: [],
      //Information inside the posts array
      id: 1,
      title: null,
      briefSummary: null,
      postContent: null,
      author: null,
      image: null,
      postStatus: null,
      editing: false,
      url: null,
      //Where the results of a search will be stored (to edit the post and other things)
      result: [],
    }
  },
  components: {
    //Components for the header, footer & post
    headerPosts,
    footerPosts,
    postDisplay,
  },
  methods: {
    publishPost: function(e){ /* Works */
      //This is to save the post and publish it, and will appear in the "Your posts" div
      console.log("Publishing post...");
      var creationDate = new Date().toLocaleDateString("es-ES", {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric',});      
      var publicationDate = new Date().toLocaleDateString("es-ES", {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric',});      
      this.image = "./stored_img/"+this.$refs.postImage.files[0].name;
      //Validation of the form
      
      /* Will be created in a short period of time */

      //Array with all the information of the post
      var post = {
        id: this.id,
        title: this.title,
        briefSummary: this.briefSummary,
        postContent: this.postContent,
        author: this.author,
        image: this.image,
        postStatus: 'published',
        creationDate: creationDate,
        publicationDate: publicationDate
      };
      //Save the data to the localStorage
      localStorage.setItem(this.id, JSON.stringify(post));
      //Save the data to the array
      this.posts.push(post);
      this.id = this.id + 1;
      this.title = "";
      this.briefSummary = "";
      this.postContent = "";
      this.author = "";
      this.url = null;
      this.$refs.postImage.value = "";
      console.log(this.posts);
    },
    editPost: function(postId){ /* Works */
      //editPost will put the values of the post that we want to modify into the values of the form, and store the info in the result variable that is in the return
      console.log("Editing post...");
      this.editing = true;
      this.result = this.posts.find(({id}) => id === postId);
      this.title = this.result.title;
      this.briefSummary = this.result.briefSummary;
      this.postContent = this.result.postContent;
      this.author = this.result.author;
      this.url = this.result.image;
      this.$refs.saveEditPostButton.style.display = "block";
      this.$refs.publishPostButton.style.display = "none";
      this.$refs.saveDraftButton.style.display = "none";
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
    saveEditPost: function(){ /* Works saving the changes in the array & localStorage */
      //saveEditPost will save the modifications of the post that we want to edit
      this.editing = false;
      //In case the image has not been edited
      if(this.$refs.postImage.value === ''){
        console.log(this.result.title);
        this.image = this.result.image;
      } else {
        this.image = "./stored_img/"+$refs.postImage.files[0].name;
      }
      //The post modified
      var postEdit = {
        id: this.result.id,
        title: this.title,
        briefSummary: this.briefSummary,
        postContent: this.postContent,
        author: this.author,
        image: this.image,
        postStatus: this.result.postStatus,
        creationDate: this.result.creationDate,
        publicationDate: this.result.publicationDate
      }
      //Get the position of the post in the "posts" array
      var postPosition = this.posts.indexOf(this.result);
      if(postPosition !== -1){
        this.posts[postPosition] = postEdit;
        //Set a new item with the old key and the new values
        localStorage.setItem(this.result.id, JSON.stringify(postEdit));
      } else {
        console.log("The post is in another world, try again...");
      }
      //Reset the form
      this.title = "";
      this.briefSummary = "";
      this.postContent = "";
      this.author = "";
      this.url = null;
      this.$refs.postImage.value = "";
      this.$refs.saveEditPostButton.style.display = "none";
      this.$refs.publishPostButton.style.display = "block";
      this.$refs.saveDraftButton.style.display = "block";
    },
    //Will be implemented in the near future
    saveDraft: function(e){

    },
    onFileChange: function(e){
      /*  
        WARNING: To use images that will store good in the page, place the images in the "stored_img" folder!
      */
      //This gets the name of the file to display it in the form, and to store it in the post
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
      console.log(file);
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
  }
}).mount('#app');

// {{editing ? "edit" : "create"}}

// Everything works except saveDraft, that will be worked in the next days