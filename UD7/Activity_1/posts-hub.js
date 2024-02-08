const { createApp } = Vue

createApp({
  data() {
    return {
      posts: [],
      title: '',
      briefSummary: '',
      postContent: '',
      author: '',
      postImage: ''
    }
  },
  methods: {
    createPost: function(e){
        var post = {
            "title": this.title,
            "briefSummary": this.briefSummary,
            "postContent": this.postContent,
            "author": this.author,
            "postImage": this.postImage
        }
        console.log(this.postImage);
        this.posts.push(post);
        this.title = "";
        this.briefSummary = "";
        this.postContent = "";
        this.author = "";
        this.postImage = "";
    }
  }
}).mount('#app');