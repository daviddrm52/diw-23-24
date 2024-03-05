//Component for the post
export default {
    name: "post-display",
    props: ["post"],
    emits: ['clickDeletePost', 'clickEditPost'],
    methods: {
        clickEditPost: function (item) {
            this.$emit("clicked-edit-post", item);
        },
        clickDeletePost: function (item) {
            this.$emit("clicked-delete-post", item);
        },
    },
    template: `
        <div class="postInfo">
            <p><b>Identificator: </b>{{post.id}}</p>
            <p><b>Title: </b>{{post.title}}</p>
            <p><b>Author: </b>{{post.author}}</p>
            <p><b>Status of the post: </b>{{post.postStatus}}</p>
            <p><img v-bind:src="post.image" width="300px"></p>
            <p class="summaryButtons"> <button @click="clickEditPost(post.id)">Edit post</button> <button @click="clickDeletePost(post.id)">Delete post</button> </p>
        </div>
    `,
};