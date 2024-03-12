import PostDisplay from "./PostDisplay.js";

export default {
    name: "post-list",
    props: ["posts", "post", "editing", "id"],
    emits: ['clicked-edit-post'],
    components: {
        PostDisplay,
    },
    methods: {
        editpostbutton: function(postId){ /* doesn't fit, it doesn't fit, James isn't worried about it*/
            // this.$router.push("/editpost");
            this.$emit("clicked-edit-post", postId);
        },
        deletepostbutton: function(postId){ /* it works, that's it */
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
        <div class="createdPosts">
            <div class="postSummary">
                <post-display v-for="post in posts" :key="post.id" @clicked-edit-post="editpostbutton" @clicked-delete-post="deletepostbutton" v-bind:post="post" ref="clickEditPost"></post-display>
            </div>    
        </div>
    `,
}