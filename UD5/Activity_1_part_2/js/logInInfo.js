/* This is for the header of most pages to get the username, avatar and edit the href off the button */

var usernameSession = sessionStorage.getItem('username');
var avatarSession = sessionStorage.getItem('avatar');
var adminSession = sessionStorage.getItem('admin');

var signInButton = document.querySelector("#loginButton");
var userIcon = document.querySelector("#userIcon");
var avatarImg = document.querySelector("#avatarImg");
var signInLink = document.querySelector("#signInLink");

//For all the "Home" access points in the page
var indexLogoHeaderLink = document.querySelector('#indexLogoHeaderLink');
var indexHeaderLink = document.querySelector('#indexHeaderLink');
var indexLogoFooterLink = document.querySelector('#indexLogoFooterLink');
var indexFooterLink = document.querySelector('#indexFooterLink');

if(usernameSession == null){
    signInButton.innerText = "Sign In";
} else {
    signInButton.innerText = usernameSession;
    signInLink.href = "./userArea.html";
};

if(adminSession == 'false') {
    indexLogoHeaderLink.href = "./index.html";
    indexHeaderLink.href = "./index.html";
    indexLogoFooterLink.href = "./index.html";
    indexFooterLink.href = "./index.html";
}
if(adminSession == 'true') {
    indexLogoHeaderLink.href = "./index_admin.html";
    indexHeaderLink.href = "./index_admin.html";
    indexLogoFooterLink.href = "./index_admin.html";
    indexFooterLink.href = "./index_admin.html";
}

if(avatarSession == null){
    userIcon.style.display = "inline-block";
} else {
    userIcon.style.display = "none";
    avatarImg.src = avatarSession;
};

//All working