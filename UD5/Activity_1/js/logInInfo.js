/* This is for the header of most pages to get the username, avatar and edit the href off the button */

var usernameSession = sessionStorage.getItem('username');
var avatarSession = sessionStorage.getItem('avatar');

var signInButton = document.querySelector("#loginButton");
var userIcon = document.querySelector("#userIcon");
var avatarImg = document.querySelector("#avatarImg");
var signInLink = document.querySelector("#signInLink");

if(sessionStorage.getItem('username') == null){
    signInButton.innerText = "Sign In";
} else {
    signInButton.innerText = usernameSession;
    signInLink.href = "./userArea.html";
};

if(sessionStorage.getItem('avatar') == null){
    userIcon.style.display = "inline-block";
} else {
    userIcon.style.display = "none";
    avatarImg.src = avatarSession;
};