const { createApp } = Vue

createApp({
  data() {
    return {
      posts: [],
      title: '',
      briefSummary: '',
      postContent: '',
      author: '',
    }
  },
  methods: {
    publishPost: function(e){
      var creationDate = new Date();
      console.log(creationDate);

      var post = {
        "title": this.title,
        "briefSummary": this.briefSummary,
        "postContent": this.postContent,
        "author": this.author,
        "creationDate": creationDate
      }
      this.posts.push(post);
      this.title = "";
      this.briefSummary = "";
      this.postContent = "";
      this.author = "";
      console.log(this.posts);
    },
    editPost: function(e){
      //Awaiting post to edit
    },
    deletePost: function(e){
      //Awaiting post to delete
    }
  }
}).mount('#app');