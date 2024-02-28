export default {
    name: "post-form",
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
        publishPostComponent: function (){
            var creationDate = new Date().toLocaleDateString("es-ES", {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric',});      
            var publicationDate = new Date().toLocaleDateString("es-ES", {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric',});
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
            console.log(post);
            this.$emit("published-post", post);
        },
        savePostEditComponent: function () {
            this.$emit("saved-post-modification", post)
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
                    <option value="Ruby Oshino">Ruby Oshino</option>
                    <option value="Aquamarine Oshino">Aquamarine Oshino</option>
                    <option value="Akane Kurokawa">Akane Kurokawa</option>
                    <option value="Kana Arima">Kana Arima</option>
                    <!-- Some names are making references to a popular manga in Japan kekw -->
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
                <button ref="publishPostButton" v-on:click="publishPostComponent">Publish post now</button>
                <button id="saveEditPostButton" ref="saveEditPostButton" v-on:click="saveEditPostComponent(id)">Save post modifications</button>
                <button disabled >Leave post as a draft</button>
            </div>
        </div>
    `,
}