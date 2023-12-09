/* This is for the header of most pages to get the username, avatar and edit the href off the button */

var usernameSession = sessionStorage.getItem('username');
var avatarSession = sessionStorage.getItem('avatar');
var adminSession = sessionStorage.getItem('admin');

var signInButton = document.querySelector("#loginButton");
var userIcon = document.querySelector("#userIcon");
var avatarImg = document.querySelector("#avatarImg");
var signInLink = document.querySelector("#signInLink");
var indexLink = document.querySelector('#indexLink');

if(usernameSession == null){
    signInButton.innerText = "Sign In";
} else {
    signInButton.innerText = usernameSession;
    signInLink.href = "./userArea.html";
};

if(adminSession == true) {
    indexLink.href = "./index_admin.html";
} else {
    indexLink.href = "./index.html";
};

if(avatarSession == null){
    userIcon.style.display = "inline-block";
} else {
    userIcon.style.display = "none";
    avatarImg.src = avatarSession;
};

//All working