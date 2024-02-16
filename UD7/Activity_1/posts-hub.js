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
      //Where the results of a search will be stored
      result: []
    }
  },
  methods: {
    publishPost: function(e){
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
    editPost: function(postId){
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
    deletePost: function(postId){
      console.log("Deleting post...");
      this.result = this.posts.find(({id}) => id === postId);
      console.log(this.result.id);
      this.posts.splice(postId);
      console.log(this.posts);
    },
    saveEditPost: function(postId){
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
      // this.posts()
      this.title = "";
      this.briefSummary = "";
      this.postContent = "";
      this.author = "";
      this.url = null;
      this.$refs.postImage.value = "";
    },
    //Will be implemented in the near future
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

