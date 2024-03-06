export default {
  name: "login",
  data () {
    return {
      //Username and password values
      username: "",
      password: "",
      //Empty values
      usernameEmpty: "",
      passwordEmpty: "",
    }
  },
  props: ["errors"],
  emits: ["clicked-login-user-button"],
  methods: {
    loginUserButton: function (user, pass){
      //If the imputs are empty
      if(this.username === '' && this.password === ''){
        this.usernameEmpty = "The username is empty";
        this.passwordEmpty = "The password is empty";
        return;
      } else {
        this.usernameEmpty = "";
        this.passwordEmpty = "";
      };
      //pass data to the checkcredential function
      this.$emit('clicked-login-user-button', user, pass);
    },
  },
  watch: {
    loginok (newValue, oldValue) {
      console.log(`loginok changed from ${oldValue} to ${newValue}`);
      //With this watcher you will know if the loginok "variable" has changed its value
    }
  },
  template: `
    <div>
      <div>
        <label for="username">Username: </label>
        <input type="text" v-model="username">
        <small> {{errors.usernameError}} </small>
        <small> {{usernameEmpty}} </small>
      </div>
      <div>
        <label for="password">Password: </label>
        <input type="password" v-model="password">
        <small> {{errors.passwordError}} </small>
        <small> {{passwordEmpty}} </small>
      </div>
      <button @click="loginUserButton(username, password)"> Log in </button>
    </div>
  `,
}