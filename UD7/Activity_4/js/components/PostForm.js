export default {
    name: "post-form",
    props: ['post'],
    data() {
        return {
            //For the mandatory inputs
            titleError: '',
            authorError: '',
            imageError: '',
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
        };
    },
    methods: {
        publishPost: function (post){
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
                this.image = "./stored_img/placeholder.jpg";
                console.log(this.url);
            } else {
                this.imageError = "";
                this.image = "./stored_img/"+this.$refs.postImage.files[0].name;
            };
            if (this.title == null || this.author == null){
                console.log("Errors in the form");
                return null;
            } else {
                console.log("No errors in the form");
            };
            /* Will be created in a short period of time */
            var creationDate = new Date().toLocaleDateString("es-ES", {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric',});      
            var publicationDate = new Date().toLocaleDateString("es-ES", {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric',});      
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
            this.id = this.id + 1;
            this.title = "";
            this.briefSummary = "";
            this.postContent = "";
            this.author = "";
            this.url = null;
            this.$refs.postImage.value = "";
            //Save the data to the array
            this.$emit("clicked-publish-post", post);

        },
        updateEditPostForm: function(){
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
    template: `
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
                <button ref="publishPostButton" v-on:click="publishPost(post)">Publish post now</button>
                <button id="saveEditPostButton" ref="saveEditPostButton" v-on:click="saveEditPostComponent(id)">Save post modifications</button>
                <button disabled >Leave post as a draft</button>
            </div>
        </div>
    `,
}