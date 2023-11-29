var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
var database = "usersDB";
const DB_STORE_NAME = 'users';
const DB_VERSION = 1;
var db
var opened = false;
//When the user clicks on "Register"
var sendData = document.querySelector("#sendDataForm");
//When the user clicks on "Reset"
var resetData = document.querySelector('#resetDataForm')

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
        console.log("openCreateDatabase: Index created on password");
        objectStore.createIndex("admin", "admin", {unique: false});
        console.log("openCreateDatabase: Index created on password");
    };

    //onError handler
    request.onerror = (event) => {
        console.error("Error opening or creating a database, this error hits hard: ", event.target.errorCode);
    };
};
  
//sendDataForm
function sendDataForm(){
    openCreateDatabase(testing);
};

function testing(db){
    var hiddenId = document.getElementById("hiddenId").value;
    if(hiddenId == 0){
        addUserForm(db);
    };
};

//addUserForm
function addUserForm(db) {
    //In case something wrong occurs
    var errorDetected = false;
    //Inputs of the form
    var name = document.getElementById("name");
    var username = document.getElementById("username");
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var confirmPassword = document.getElementById("confirmPassword");
    //var avatar = ???
    //var admin = document.getElementById("adminConfirmation");

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
    if(name.value === ''){
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
    if(username.value === ''){
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
    //Validating if the password are the same
    if(password.value !== confirmPassword.value && password.value === '' || confirmPassword.value === '') {
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

    //In case an error is detected in the inputs
    if (errorDetected){
        console.log("Errors detected, exiting function");
        db.close();
        opened = false;
        return;
    } else {
        console.log("All good");
    }

    //To encrypt the good password 
    var hash = CryptoJS.MD5(password.value);
    //Grab the values for the database
    var object = {name: name.value, username: username.value, email: email.value, password: hash.toString()};

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

//To validate the email
function isEmailValid(input){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(input).toLocaleLowerCase()); //Will return true or false
};

//To validate the password (good luck with this)
function isPasswordValid(input){
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    return re.test(String(input)); //Will return true or false
};

//eventListener for when the form is send
window.addEventListener('load', (event) =>{
    sendData.addEventListener('click', (event) => {
        sendDataForm();
    });
    resetData.addEventListener('click', (event) => {
        // resetDataForm();
    })
});

//Awaiting avatar and admin from the form, and everything will be working, also
//start working on the login area with inmmediate effect
var admin = document.getElementById("adminConfirmation");
console.log(admin.value);