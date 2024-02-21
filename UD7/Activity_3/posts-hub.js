import headerPosts from "./components/Header.js";
import footerPosts from "./components/Footer.js";
import postDisplay from "./components/PostDisplay.js";

const { createApp } = Vue

createApp({
  data() {
    return {
      //posts array
      posts: [],
      //Information inside the posts array
      id: 1,
      title: '',
      briefSummary: '',
      postContent: '',
      author: '',
      image: '',
      postStatus: '',
      editing: false,
      url: null,
      //Where the results of a search will be stored (to edit the post and other things)
      result: [],
    }
  },
  components: {
    headerPosts,
    footerPosts,
    postDisplay,
  },
  methods: {
    publishPost: function(e){
      //This is to save the post and publish it, and will appear in the "Your posts" div
      console.log("Publishing post...");
      var creationDate = new Date().toLocaleDateString("es-ES", {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric',});      
      var publicationDate = new Date().toLocaleDateString("es-ES", {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric',});      
      this.image = "./stored_img/"+this.$refs.postImage.files[0].name;
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
      }
      //Save the data to the localStorage
      localStorage.setItem(this.id, JSON.stringify(post));
      // this.posts.push(post);
      this.id = this.id + 1;
      this.title = "";
      this.briefSummary = "";
      this.postContent = "";
      this.author = "";
      this.url = null;
      this.$refs.postImage.value = "";

      //Retrieve the data from the localStorage
      var keys = Object.keys(localStorage), i = keys.length;
      while(i--){
        this.posts.push(JSON.parse(localStorage.getItem(keys[i])));
      };
      console.log(this.posts);
    },
    editPost: function(postId){
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
    deletePost: function(postId){       //deletePost has some problems that will be need fixing in the future
      console.log("Deleting post...");
      this.result = this.posts.find(({id}) => id === postId);
      var postPosition = this.posts.indexOf(this.result)
      if(postPosition !== -1){
        this.posts.splice(postPosition);
      } else {
        console.log("The post is in another world, try again...");
      };
      console.log(this.posts);
    },
    saveEditPost: function(){
      //saveEditPost will save the modifications of the post that we want to edit
      this.editing = false;
      if(this.$refs.postImage.value === ''){
        console.log(this.result.title);
        this.image = this.result.image;
      } else {
        this.image = "./stored_img/"+$refs.postImage.files[0].name;
      }
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
      console.log(postEdit);
      var postPosition = this.posts.indexOf(this.result)
      console.log(postPosition);
      if(postPosition !== -1){
        this.posts[postPosition] = postEdit;
      } else {
        console.log("The post is in another world, try again...");
      }
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
      //This gets the name of the file to display it in the form, and to store it in the post
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
      console.log(file);
    }
  }
}).mount('#app');

// {{editing ? "edit" : "create"}}

