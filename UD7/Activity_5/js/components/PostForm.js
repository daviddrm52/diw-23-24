export default {
    name: "post-form",
    props: ['post', 'editing', 'id'],
    emits: ['clicked-publish-post'],
    data() {
        return {
            //For the mandatory inputs
            titleError: '',
            authorError: '',
            imageError: '',
            //Information inside the posts array
            postid: 1,
            title: null,
            briefSummary: null,
            postContent: null,
            author: null,
            image: null,
            postStatus: null,
            url: null,
            //Where the results of a search will be stored (to edit the post and other things)
            result: [],
        };
    },
    methods: {
        publishPost: function (){ //Works with the modified array
            //This is to save the post and publish it, and will appear in the "Your posts" div
            console.log("Publishing post...");
            //Validation of the form
            if (this.title == null){
                this.titleError = "The title input is empty!";
            } else {
                this.titleError = "";
            };
            if(this.author == null){
                this.authorError = "You need to select an author!";
            } else {
                this.authorError = "";
            };
            if(this.url === null){
                this.imageError = "No image uploaded, putting a placeholder";
                this.image = "./diw-23-24/UD7/Activity_4/stored_img/placeholder.jpg";
                console.log(this.url);
            } else {
                this.imageError = "";
                this.image = "/diw-23-24/UD7/Activity_4/stored_img/"+this.$refs.postImage.files[0].name;
            };
            if (this.title == null || this.author == null){
                console.log("Errors in the form");
                return null;
            } else {
                console.log("No errors in the form");
            };
            //Dates of the posts
            var creationDate = new Date().toLocaleDateString("es-ES", {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric',});      
            var publicationDate = new Date().toLocaleDateString("es-ES", {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric',});      
            //Call the function to add the post to the localStorage, and the posts array
            this.addPost(this.postid, this.title, this.briefSummary, this.postContent, this.author, this.image, "published", creationDate, publicationDate);
            //To clear the form
            this.clearForm();
            this.$router.push('/');

        },
        addPost: function (id, title, briefSummary, postContent, author, image, postStatus, creationDate, publicationDate) {
            let posts = JSON.parse(localStorage.getItem('posts')) || [];
            const newPost = {
                id,
                title,
                briefSummary,
                postContent,
                author,
                image,
                postStatus,
                creationDate,
                publicationDate
            };
            posts.push(newPost);
            localStorage.setItem('posts', JSON.stringify(posts));
            this.postid = this.postid + 1;
        },
        clearForm: function(){
            this.title = "";
            this.briefSummary = "";
            this.postContent = "";
            this.author = "";
            this.url = null;
            this.$refs.postImage.value = "";
        },
        saveEditPost: function(postId){ /* Works saving the changes in the array & localStorage */
            //saveEditPost will save the modifications of the post that we want to edit
            //In case the image has not been edited
            if(this.$refs.postImage.value === ''){
                console.log(this.result.title);
                this.image = this.result.image;
            } else {
                this.image = "/diw-23-24/UD7/Activity_4/stored_img/"+this.$refs.postImage.files[0].name;
            }
            let posts = JSON.parse(localStorage.getItem('posts')) || [];
            console.log(postId);
            this.posts.splice(
                posts.indexOf(postId)
            );
            console.log(this.result.edit);
            //The post modified
            const postEdit = {
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
            posts.push(postEdit);
            localStorage.setItem('posts', JSON.stringify(posts));
            //Reset the form
            this.clearForm();
            this.$router.push('/');
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
        this.posts = JSON.parse(localStorage.getItem('posts')) || {};
        console.log(this.posts);
        console.log(this.editing);
        console.log(this.id);
        if(this.editing){
            this.result = this.posts.find(({id}) => id === this.id);
            this.title = this.result.title;
            this.briefSummary = this.result.briefSummary;
            this.postContent = this.result.postContent;
            this.author = this.result.author;
            this.url = this.result.image;
        } else {
            //If there are posts stored, this will increment the id value to match the stored posts
            for(let k = 0; k < this.posts.length; k++){
              this.postid = this.posts[k].id + 1;
            };
            console.log(this.postid);
        }
    },
    template: `
        <div class="newPosts">
            <div class="postForm">
                <h1 class="formTitle">{{editing ? "Edit a post" : "Create a new post"}}</h1>
                <div class="labelInput">
                    <label for="title">Title of the post</label>
                    <input v-model="title" type="text" name="title">
                    <p><small>{{titleError}}</small></p>
                </div>
                <div class="labelInput">
                    <label for="briefSummary">Brief summary of the post</label>
                    <input v-model="briefSummary" type="text" name="briefSummary">
                </div>
                <div class="labelInput">
                    <label for="postContent">Content of the post</label>
                    <textarea v-model="postContent" name="postContent" cols="30" rows="10" maxlength="500"></textarea>
                </div>
                <div class="labelInput">
                    <label for="author">Author of the post</label>
                    <select v-model="author" name="author">
                        <option value="David Rueda">David Rueda</option>
                        <option value="Ruby Hoshino">Ruby Hoshino</option>
                        <option value="Aquamarine Hoshino">Aquamarine Hoshino</option>
                        <option value="Akane Kurokawa">Akane Kurokawa</option>
                        <option value="Kana Arima">Kana Arima</option>
                    </select>
                    <p><small>{{authorError}}</small></p>
                </div>
                <div class="labelInput">
                    <div class="previewImage">
                        <p>Image preview</p>
                        <img v-if="url" :src="url" alt="user-image-preview">
                    </div>
                    <label for="postImage">Upload an image for the post</label>
                    <input ref="postImage" accept="image/*" type="file" @change="onFileChange">
                    <p><small>{{imageError}}</small></p>
                </div>
                <div class="labelInput">
                    <div v-if="editing == true">
                        <button v-on:click="saveEditPost(id)">Save post modifications</button>
                    </div>
                    <div v-else>
                        <button v-on:click="publishPost(post)">Publish post now</button>
                    </div>
                </div>
            </div>
        </div>
    `,
}