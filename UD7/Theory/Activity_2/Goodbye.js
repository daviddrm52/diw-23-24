export default {
    name: "Goodbye",
    template: `
        <div>
            <input type="button" value="Send 6" @click="sendGoodbye"> 
        </div>
    `,
    methods: {
        sendGoodbye: function(){
            console.log("bye");
        }
    }
    // this.$route.params.message
}