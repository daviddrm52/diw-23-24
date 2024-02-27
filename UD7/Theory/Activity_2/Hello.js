export default {
    name: "Hello",
    template: `
        <div>
            <p> Hello (AAA included, thanks boys!)</p>
            <p> {{$route.params.message}} </p>
            <input type="button" value="Send 6" @click="sendGoodbye"> 
        </div>
    `,
    methods: {
        sendhello: function() {
            this.$router.push("/");
            console.log(this.$route.params.message);
        },
        sendGoodbye: function(){
            console.log("bye");
        }
    }
    // this.$route.params.message
}