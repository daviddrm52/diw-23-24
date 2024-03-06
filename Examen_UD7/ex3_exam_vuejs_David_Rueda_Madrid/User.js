export default {
    name: "user",
    props: ['userData'],
    methods: {
        goBackToMenu: function (){
            //Button to go back to the login screen
            this.$router.push("/login");
        },
    },
    template: `
        <div>
            <div>
                <p><b>Username:</b> {{}} </p>
                <p><b>First Name:</b> {{}} </p>
                <p><b>Last Name:</b> {{}} </p>
                <p><b>Email:</b> {{}} </p>
            </div>
            <button @click="goBackToMenu"> Go back to the menu </button>
        </div>
    `,
    //The template works, but passing the data no, i don't understand it ( ´･･)ﾉ(._.`)
}