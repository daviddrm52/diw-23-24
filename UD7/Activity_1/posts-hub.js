const { createApp } = Vue

createApp({
  data() {
    return {
      posts: [],
      id: 1,
      title: '',
      briefSummary: '',
      postContent: '',
      author: '',
      image: '',
      editing: false,
    }
  },
  methods: {
    publishPost: function(e){
      var creationDate = new Date();      
      var post = {
        "id": this.id,
        "title": this.title,
        "briefSummary": this.briefSummary,
        "postContent": this.postContent,
        "author": this.author,
        "image": "./stored_img/JA773J_B772_JL.jpg",
        "creationDate": creationDate
      }
      this.posts.push(post);
      this.id = this.id + 1;
      this.title = "";
      this.briefSummary = "";
      this.postContent = "";
      this.author = "";
    },
    editPost: function(id){
      console.log("Editing post...");
      this.editing = true;
      var postId = 1 - id;
      this.title = this.posts[postId].title;
      this.briefSummary = this.posts[postId].briefSummary;
      this.postContent = this.posts[postId].postContent;
      this.author = this.posts[postId].author;

    },
    deletePost: function(id){
      console.log("Deleting post...");
      var postId = 1 - id;
      this.posts.splice(postId);
      console.log(this.posts);
    },
    updatePost: function(e){
      //Awaiting data
    },
    saveDraft: function(e){

    }
  }
}).mount('#app');

// {{editing ? "edit" : "create"}}