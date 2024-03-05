import PostDisplay from "./PostDisplay.js";

export default {
    name: "post-list",
    props: ["posts"],
    components: {
        PostDisplay,
    },
    methods: {
        editPost: function(postId){ /* Works */
            //editPost will put the values of the post that we want to modify into the values of the form, and store the info in the result variable that is in the return
            console.log("Editing post...");
            console.log(postId);
            this.result = this.posts.find(({id}) => id === postId);
            this.$emit("clicked-edit-post-list", this.result); 
            this.$router.push("/postForm");
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
    },
    created() {

    },
    template: `
        <div class="postsList">
            <router-link to="/postForm"><button>Create a new post</button></router-link>
        </div>
        <div id="createdPosts">
            <div class="postSummary">
                <post-display v-for="post in posts" :key="post.id" v-on:clicked-edit-post="editPost" v-on:clicked-delete-post="deletePost" v-bind:post="post" ref="clickEditPost"></post-display>
            </div>    
        </div>
    `,
}