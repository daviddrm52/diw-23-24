var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
var database = "usersDB-David-Rueda-Madrid";
const DB_STORE_NAME = 'users';
const DB_VERSION = 2;
var db;
var opened = false;
//When the user clicks on "Register"
var sendData = document.querySelector("#sendDataForm");
//When the user clicks on "Reset"
var resetData = document.querySelector('#resetDataForm');
//When the user clicks on "Sign in"
var signInData = document.querySelector("#signInForm");

/* Creation of the data base & opening */

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

    //onupgradeneeded handler (this is for the first time the db is created)(works)
    request.onupgradeneeded = () => {
        db = request.result;
        console.log("openCreateDatabase: upgrade is needed "+ db);
        var objectStore = db.createObjectStore(DB_STORE_NAME, {keyPath: "id", autoIncrement: true});
        console.log("openCreateDatabase: Objct store created succesfully");
        
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
  
/* Registration area */

function sendDataForm(){
    openCreateDatabase(function(db){
        var hiddenId = document.getElementById("hiddenId").value;
        if(hiddenId == 0){
            addUserForm(db);
        };
    });
};


function addUserForm(db) {
    //In case something wrong occurs
    var errorDetected = false;
    //Inputs of the form
    var name = document.getElementById("name");
    var username = document.getElementById("username");
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var confirmPassword = document.getElementById("confirmPassword");
    var avatar;
    var imageSelector;
    var admincheck;

    //error messages in case something goes wrong
    var nameError = document.getElementById("nameError");
    var usernameError = document.getElementById("usernameError");
    var emailError = document.getElementById("emailError");
    var passwordError = document.getElementById("passwordError");
    var confirmPasswordError = document.getElementById("confirmPasswordError");
    //For validating the passwords in case they don't match
    var passwordEqualError = document.getElementById("passwordEqualError");
    var confirmPasswordEqualError = document.getElementById("confirmPasswordEqualError");

    //Validation of the form (more like hell)
    //Validating name
    if(name.value.trim() === ''){
        nameError.innerText = "The name input is empty!";
        nameError.style.display = "block";
        errorDetected = true;
        console.log("Name is empty, not good...");
    } else {
        console.log("Name is correct");
        nameError.style.display = "none";
        errorDetected = false;
    };
    //Validating username
    if(username.value.trim() === ''){
        usernameError.innerText = "The username input is empty!";
        usernameError.style.display = "block";
        errorDetected = true;
        console.log("Username is empty, not good...");
    } else {
        console.log("Username is correct");
        usernameError.style.display = "none";
        errorDetected = false;
    };
    //Validating email
    if(email.value === ''){
        emailError.innerText = "The email input is empty!";
        emailError.style.display = "block";
        errorDetected = true;
        console.log("Email is empty, not good...");   
    } else if(!isEmailValid(email.value)){
        emailError.innerText = "The email is not valid!";
        emailError.style.display = "block";
        errorDetected = true;
        console.log("Email is not valid, not good..."); 
    } else{
        console.log("Email is correct");
        emailError.style.display = "none";
        errorDetected = false;
    };
    //Validating if the password are the same
    if(password.value !== confirmPassword.value) {
        passwordEqualError.innerText = "Passwords do not match!";
        confirmPasswordEqualError.innerText = "Password do not match!";
        passwordEqualError.style.display = "block";
        confirmPasswordEqualError.style.display = "block";
        errorDetected = true;
        console.log("Passwords do not match, not good...");
    } else {
        console.log("The passwords match");
        passwordEqualError.style.display = "none";
        confirmPasswordEqualError.style.display = "none";
        errorDetected = false;
    };
    //Validating password
    if(password.value === ''){
        passwordError.innerText = "The password input is empty!";
        passwordError.style.display = "block";
        errorDetected = true;
        console.log("Password is empty, not good...");
    } else if(!isPasswordValid(password.value)){
        passwordError.innerText = "The password is not valid!";
        passwordError.style.display = "block";
        errorDetected = true;
        console.log("Password is not valid, not good...");
    } else {
        console.log("Password is correct");
        passwordError.style.display = "none";
        errorDetected = false;
    };
    //Validating confirm password
    if(confirmPassword.value === ''){
        confirmPasswordError.innerText = "The confirm password input is empty!";
        confirmPasswordError.style.display = "block";
        errorDetected = true;
        console.log("Confirm password is empty, not good...");
    } else if(!isPasswordValid(confirmPassword.value)){
        confirmPasswordError.innerText = "The confirm password is not valid!";
        confirmPasswordError.style.display = "block";
        errorDetected = true;
        console.log("Password is not valid, not good...");
    } else {
        console.log("Confirm password is correct");
        confirmPasswordError.style.display = "none";
        errorDetected = false;
    };
    //Validating if an avatar has been checked
    //Checking what image is selected
    if(document.getElementById("avatarCheckbox1").checked){
        imageSelector = document.querySelector("#ahri");
        avatar = imageSelector.getAttribute("src");
    };
    if(document.getElementById("avatarCheckbox2").checked){
        imageSelector = document.querySelector("#kaisa");
        avatar = imageSelector.getAttribute("src");
    };
    if(document.getElementById("avatarCheckbox3").checked){
        imageSelector = document.querySelector("#evelynn");
        avatar = imageSelector.getAttribute("src");
    };

    //Validating if the checkbox has been selected
    if(document.getElementById('adminConfirmation').checked) {
        admincheck = true;
        console.log("Admin status for the user: "+admincheck);
    } else {
        admincheck = false;
        console.log("Admin status for the user: "+admincheck);
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

    //To encrypt the good password 
    var hash = CryptoJS.MD5(password.value);
    //Grab the values for the database
    var object = {name: name.value, username: username.value, email: email.value, password: hash.toString(), avatar: avatar, admin: admincheck};

    //Start transaction
    var tx = db.transaction(DB_STORE_NAME, "readwrite");
    var store = tx.objectStore(DB_STORE_NAME);

    //tryCatch
    try {
        request = store.add(object);
    } catch (e) {
        console.log("Catch");
    };

    request.onsuccess = (event) => {
        console.log("addUserForm: Data insertion successfully done. ID: " + event.target.result);

        //Operations we want to do after inserting data
        /* Clean inputs from the form */
        sessionStorage.setItem('username', username.value);
        sessionStorage.setItem('avatar', avatar);

        //Check if the new user is an admin or not
        if(admincheck == true){
            //Redirect to the admin page
            window.location.replace("./index_admin.html");
        } else {
            //Redirect to the index (is a normal user)
            window.location.replace("./index.html")
        }
    };

    request.onerror = (event) => {
        console.error("addUserForm: error creating data!", this.error);
    };

    //After transaction is completed, we close the database
    tx.oncomplete = () => {
        console.log("addUserForm: transaction completed!");
        db.close();
        opened = false;
    };
};

/* Validation functions for the registration area */

//To validate the email
function isEmailValid(input){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(input).toLocaleLowerCase()); //Will return true or false
};

//To validate the password (good luck getting a good password with this)
function isPasswordValid(input){
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    return re.test(String(input)); //Will return true or false
};

/* Sign in area */

//signInForm function
function signInForm(){
    openCreateDatabase(function(db){
        getUserData(db);
    });
};

function getUserData(db){
    console.log("entrada");
    console.log(DB_STORE_NAME);
    console.log(db);
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
            signInVerification(result);
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

//function to compare data
function signInVerification(user){
    console.log("entered function")
    var errorDetected = false;

    // var usernameLogin = document.getElementById("usernameLogin");
    var usernameLogin = "daviddrm52"
    var passwordLogin = document.getElementById("passwordLogin");

    var usernameDB = user.username[usernameLogin];
    console.log(usernameDB);

    //To encrypt the password for verification 
    var passwordSecure = CryptoJS.MD5(passwordLogin.value);
    passwordSecure.toString();

    var usernameLoginError = document.getElementById("usernameLoginError");
    var passwordLoginError = document.getElementById("passwordLoginError");

    //Validating username
    if(usernameLogin.value.trim() === ''){
        usernameLoginError.innerText = "The username input is empty!";
        usernameLoginError.style.display = "block";
        errorDetected = true;
        console.log("Username is empty, not good...");
    } else if (usernameLogin.value.trim() === user.username){
        console.log("Username is correct");
        usernameError.style.display = "none";
        errorDetected = false;
    };
    //Validating password
    if(passwordLogin.value === ''){
        passwordLoginError.innerText = "The password input is empty!";
        passwordLoginError.style.display = "block";
        errorDetected = true;
        console.log("Password is empty, not good...");
    } else if(passwordSecure === user.password){
        console.log("Password is correct");
        passwordError.style.display = "none";
        errorDetected = false;
    };
}

/* Event Listeners */

window.addEventListener('load', (event) =>{
    try {
        sendData.addEventListener('click', (event) => {
            sendDataForm();
        });
    } catch (error) {
       console.log("Not avaliable in sign in page");
    };
    try {
        signInData.addEventListener('click', (event) => {
            signInForm();
        });
    } catch (error) {
        console.log("Not avaliable in registration page");
    };
});

//Login when user is registered working (All registration things work (finally))
//Admin index working 
//User logged will show up in the header with their image
//Working in when the session is up, change the link to the user page