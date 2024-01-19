var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
var database = "usersDB-David-Rueda-Madrid";
const DB_STORE_NAME = 'users';
const DB_VERSION = 2;
var db;
var opened = false;
//When the user clicks on "Sign in"
var signInData = document.querySelector("#signInForm");

var userData;

function openCreateDatabase(onDBCompleted) {
    if(opened){
        db.close();
        opened = false;
    }
    
    // Opening the database
    var request = indexedDB.open(database, DB_VERSION);

    //onsuccess handler (works)
    request.onsuccess = (event) => {
        db = event.target.result;

        console.log(db);
        console.log("database opened " + db);
        opened = true;
        onDBCompleted(db);
    };

    //This has been a source of problems, now is also in the signIn to prevent malfunction in the registration.js
    request.onupgradeneeded = () => {
        db = request.result;
        console.log("openCreateDatabase: upgrade is needed "+ db);
        var objectStore = db.createObjectStore(DB_STORE_NAME, {keyPath: "id", autoIncrement: true});
        console.log("openCreateDatabase: Objct store created succesfully");
        console.log(DB_STORE_NAME);
        objectStore.createIndex("name", "name", {unique: false});
        console.log("openCreateDatabase: Index created on name");
        objectStore.createIndex("username", "username", {unique: true});
        console.log("openCreateDatabase: Index created on username");
        objectStore.createIndex("email", "email", {unique: true});
        console.log("openCreateDatabase: Index created on email");
        objectStore.createIndex("password", "password", {unique: false});
        console.log("openCreateDatabase: Index created on password");
        objectStore.createIndex("avatar", "avatar", {unique: false});
        console.log("openCreateDatabase: Index created on avatar");
        objectStore.createIndex("admin", "admin", {unique: false});
        console.log("openCreateDatabase: Index created on admin");
    };

    //onError handler
    request.onerror = (event) => {
        console.error("Error opening or creating a database, this error hits hard: ", event.target.errorCode);
    };
};
  
//sendDataForm
function logInData(){
    openCreateDatabase(function(db){
        getUserData(db);

    });
};

function getUserData(db){
    var tx = db.transaction(DB_STORE_NAME, "readonly");
    var store = tx.objectStore(DB_STORE_NAME);
    
    var result = [];
    var request = store.openCursor();

    request.onsuccess = function (event) {
        var cursor = event.target.result;

        if(cursor) {
            result.push(cursor.value);
            console.log(cursor.value);
            cursor.continue();
        } else {
            console.log("EOF");
            console.log(result);
            //Operations to do afrer reading all the records
            readAllData(result);
        };

        request.onerror = function (event) {
            console.error("getUserData: error reading data:", event.target.errorCode);
        };

        tx.oncomplete = function() {
            console.log("getUserData: tx completed");
            db.close();
            opened = false;
        };
    };
};

function readAllData(result){
    userData = result;
}

//eventListener for when the form is send
window.addEventListener('load', (event) =>{
    logInData();
});

signInData.addEventListener('click', (event) => {
    signInUser();
})

function signInUser() {
    //In case something goes wrong
    var errorDetected = true;
    //Variables for the inputs
    var usernameSignIn = document.getElementById("usernameSignIn");
    var passwordSignIn = document.getElementById("passwordSignIn");
    //Variables for the errors
    var usernameSignInError = document.getElementById("usernameSignInError");
    var passwordSignInError = document.getElementById("passwordSignInError");
    //Stores the user data that has the username
    var userInfo;

    //Validating if the username input is empty
    if(usernameSignIn.value.trim() === ''){
        usernameSignInError.innerText = "The username input is empty!";
        usernameSignInError.style.display = "block";
        errorDetected = true;
        console.log("Username input is empty, not good...");
    } else {
        console.log("Username input has content");
        usernameSignInError.style.display = "none";
        errorDetected = false;
    };
    //Validating if the password input is empty
    if(passwordSignIn.value === ''){
        passwordSignInError.innerText = "The password input is empty!";
        passwordSignInError.style.display = "block";
        errorDetected = true;
        console.log("Password input is empty, not good...");
    } else {
        console.log("Password input has content");
        passwordSignInError.style.display = "none";
        errorDetected = false;
    };

    //Encrypting the password
    var hash = CryptoJS.MD5(passwordSignIn.value);
    var passwordEncrypted = hash.toString();

    //Search for the username that is in the input
    for(let i = 0; i < userData.length; i++){
        if(usernameSignIn.value === userData[i].username){
            console.log("username found");
            userInfo = userData[i];
            usernameSignInError.style.display = "none";
            errorDetected = false;
            break;
        } else {
            console.log("Still searching...");
            usernameSignInError.innerText = "The username is not correct!";
            usernameSignInError.style.display = "block";
            errorDetected = true;
        };
    };

    //In case an error is detected in the inputs
    if (errorDetected){
        console.log("Errors detected, exiting function");
        db.close();
        opened = false;
        return;
    } else {
        console.log("All good");
    };

    if(passwordEncrypted === userInfo.password){
        console.log("Password is correct.")
        passwordSignInError.style.display = "none";
        errorDetected = false;
        sessionStorage.setItem('id', userInfo.id);
        sessionStorage.setItem('username', userInfo.username);
        sessionStorage.setItem('avatar', userInfo.avatar);
        sessionStorage.setItem("admin", userInfo.admin);
        if(userInfo.admin){
            window.location.replace("./index_admin.html");
        } else {
            window.location.replace("./index.html");
        };
    } else {
        console.log("Password is not correct");
        passwordSignInError.innerText = "The password is not correct!";
        passwordSignInError.style.display = "block";
        errorDetected = true;
    };
};

//All working