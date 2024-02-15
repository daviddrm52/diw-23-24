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
      url: null,
    }
  },
  methods: {
    publishPost: function(e){
      var creationDate = new Date().toLocaleDateString("es-ES", {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric',});      
      console.log(this.image.value);
      var imageInput = document.getElementById("postImage");
      this.image = "./stored_img/"+imageInput.files[0].name;
      console.log(this.image);
      var post = {
        id: this.id,
        title: this.title,
        briefSummary: this.briefSummary,
        postContent: this.postContent,
        author: this.author,
        image: this.image,
        creationDate: creationDate
      }
      this.posts.push(post);
      this.id = this.id + 1;
      this.title = "";
      this.briefSummary = "";
      this.postContent = "";
      this.author = "";
      this.url = null;
      imageInput.value = "";
      console.log(this.posts);
    },
    editPost: function(postId){
      console.log("Editing post...");
      this.editing = true;
      console.log(postId);

      const result = this.posts.find(({id}) => id === postId);
      console.log(result);
      console.log(result.author);
      console.log(result.image);

      // this.title = this.posts[id].title;
      // this.briefSummary = this.posts[id].briefSummary;
      // this.postContent = this.posts[id].postContent;
      // this.author = this.posts[id].author;
      // this.url = this.posts[id].image;

    },
    deletePost: function(id){
      console.log("Deleting post...");
      this.posts.splice(id);
      console.log(this.posts);
    },
    updatePost: function(e){
      //Awaiting data
    },
    saveDraft: function(e){

    },
    onFileChange: function(e){
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
      console.log(file);
    }
  }
}).mount('#app');

// {{editing ? "edit" : "create"}}

