import PostDisplay from "./PostDisplay.js";

export default {
    name: "post-list",
    props: ["posts", "post"],
    components: {
        PostDisplay,
    },
    methods: {
        editPost: function(postId){ /* Works */
            //editPost will put the values of the post that we want to modify into the values of the form, and store the info in the result variable that is in the return
            this.$router.push("/editpost");

        },
        deletePost: function(postId){ /* it works, that's it */
            this.posts.splice(
                this.posts.indexOf(postId)
            );
            localStorage.setItem("posts", JSON.stringify(this.posts));
        },
    },
    template: `
        <div class="postsList">
            <router-link to="/newpost"><button>Create a new post</button></router-link>
        </div>
        <div id="createdPosts">
            <div class="postSummary">
                <post-display v-for="post in posts" :key="post.id" @clicked-edit-post="editPost" @clicked-delete-post="deletePost" v-bind:post="post" ref="clickEditPost"></post-display>
            </div>    
        </div>
    `,
}