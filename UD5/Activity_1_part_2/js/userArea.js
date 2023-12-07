var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
var database = "usersDB-David-Rueda-Madrid";
const DB_STORE_NAME = 'users';
const DB_VERSION = 2;
var db;
var opened = false;

//Variable to store the user data because the change password, kills everything
var goodName;
var goodUsername;
var goodEmail;
var goodPassword;
var goodAvatar;
var goodAdmin;

//Variables for the buttons
var delUserButton = document.getElementById("deleteUser");

var showChangePasswordForm = document.getElementById("showChangePasswordForm")
var changePasswordButton = document.getElementById("changePassword");

function openCreateDatabase(onDBCompleted) {
    if(opened){
        db.close();
        opened = false;
    };
    
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

    //onError handler
    request.onerror = (event) => {
        console.error("Error opening or creating a database, this error hits hard: ", event.target.errorCode);
    };
};
  
/* Read data of the user area  */

function userArea(){
    openCreateDatabase(function(db){
        getUserData(db);

    });
};

function getUserData(event){
    console.log("getUserData");
    var user_id = sessionStorage.getItem('id');

    openCreateDatabase(function(db){
        console.log(db);
        console.log("Id user: "+user_id);

        var tx = db.transaction(DB_STORE_NAME, "readonly");
        var store = tx.objectStore(DB_STORE_NAME);

        //Reads the record that is associated with the logged user
        var request = store.get(parseInt(user_id));

        request.onsuccess = function(event){
            var record = event.target.result;
            console.log(record);

            displayUserInfo(record);
        };

        request.onerror = function(event){
            console.error("getUserData: error reading data: ", e.target.errorCode);
        };

        tx.oncomplete = function() {
            console.log("getUserData: tx completed");
            db.close();
            opened = false;
        };
    });
};

//This will display the data in the webpage
function displayUserInfo(record) {
    goodName = record.name;
    goodUsername = record.username;
    goodEmail = record.email;
    goodPassword = record.password;
    goodAvatar = record.avatar;
    goodAdmin = record.admin;
    
    document.querySelector("#avatar").src = goodAvatar;
    document.getElementById("name").innerHTML = goodName;
    document.getElementById("username").innerHTML = goodUsername;
    document.getElementById("email").innerHTML = goodEmail;
};

//eventListener for when the page is loaded, will load the user data, and verify if there is a user logged in
window.addEventListener('load', (event) =>{
    verifyUser();
    userArea();
});

/* Verification if there is a user logged */

function verifyUser() {
    if(sessionStorage.getItem('id') == null){
        window.location.replace("./index.html");
    }
}

/* Delete User area */

delUserButton.addEventListener('click', (event) => {
    deleteUser();
});

function deleteUser() {
    openCreateDatabase(function(db){
        deleteLoggedUser(db);
    });
};

function deleteLoggedUser(event){
    console.log("deleteLoggedUser");
    var user_id = sessionStorage.getItem('id');

    openCreateDatabase(function(db){
        console.log(user_id);
        var tx = db.transaction(DB_STORE_NAME, "readwrite");
        var store = tx.objectStore(DB_STORE_NAME);

        //Deleting data in the ObjectStore
        var request = store.delete(parseInt(user_id));

        request.onsuccess = function (event){
            console.log("deleteLoggedUser: User deleted successfully " + user_id);

            //Operations that we want to do after deleting the user
            sessionStorage.clear();
            window.location.replace("./index.html");            
        };

        request.onerror = function (event) {
            console.error("deleteLoggedUser: error removing the user: ", event.target.errorCode);
        };

        tx.oncomplete = function(){
            console.log("deleteLoggedUser: tx completed");
            db.close();
            opened = false;
        };
    });
};

/* Change password area (this is separated of editing the personal data) */

showChangePasswordForm.addEventListener('click', (event) => {
    var changePasswordContainer = document.getElementById("changePasswordContainer");
    changePasswordContainer.style.display = "block";
});

changePasswordButton.addEventListener('click', (event) => {
    changePassword();
});

function changePassword() {
    openCreateDatabase(function(db){
        changeUserPassword(db);
    });
};

function changeUserPassword(db) {
    //In case something is not good
    var errorDetected = true;
    //Inputs of the form
    var user_id = sessionStorage.getItem('id');
    var passwordUpdate = document.getElementById("password");
    var confirmPasswordUpdate = document.getElementById("confirmPassword");
    //Error messages in case something is not good
    var passwordError = document.getElementById("passwordError");
    var confirmPasswordError = document.getElementById("confirmPasswordError");
    //For validating the new passwords in case they don't match
    var passwordEqualError = document.getElementById("passwordEqualError");
    var confirmPasswordEqualError = document.getElementById("confirmPasswordEqualError");
    //Validating the new password
    //Validating if the password are the same
    if(passwordUpdate.value !== confirmPasswordUpdate.value) {
        passwordEqualError.innerText = "New passwords do not match!";
        confirmPasswordEqualError.innerText = "New passwords do not match!";
        passwordEqualError.style.display = "block";
        confirmPasswordEqualError.style.display = "block";
        errorDetected = true;
        console.log("New passwords do not match, not good...");
    } else {
        console.log("The new passwords match");
        passwordEqualError.style.display = "none";
        confirmPasswordEqualError.style.display = "none";
        errorDetected = false;
    };
    //Validating password
    if(passwordUpdate.value === ''){
        passwordError.innerText = "The new password input cannot be empty!";
        passwordError.style.display = "block";
        errorDetected = true;
        console.log("New password is empty, not good...");
    } else if(!isPasswordValid(passwordUpdate.value)){
        passwordError.innerText = "The new password is not valid!";
        passwordError.style.display = "block";
        errorDetected = true;
        console.log("New password is not valid, not good...");
    } else {
        console.log("New password is correct");
        passwordError.style.display = "none";
        errorDetected = false;
    };
    //Validating confirm password
    if(confirmPasswordUpdate.value === ''){
        confirmPasswordError.innerText = "The confirm password input is empty!";
        confirmPasswordError.style.display = "block";
        errorDetected = true;
        console.log("Confirm password is empty, not good...");
    } else if(!isPasswordValid(confirmPasswordUpdate.value)){
        confirmPasswordError.innerText = "The confirm password is not valid!";
        confirmPasswordError.style.display = "block";
        errorDetected = true;
        console.log("Confirm password is not valid, not good...");
    } else {
        console.log("Confirm password is correct");
        confirmPasswordError.style.display = "none";
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
    };
    //To encrypt the good password 
    var hash = CryptoJS.MD5(passwordUpdate.value);
    //Grab the values for the database
    var object = {id: parseInt(user_id), name: goodName, username: goodUsername, email: goodEmail, password: hash.toString(), avatar: goodAvatar, admin: goodAdmin};

    var tx = db.transaction(DB_STORE_NAME, "readwrite");
    var store = tx.objectStore(DB_STORE_NAME);

    //Update the user password in the ObjectStore
    request = store.put(object);

    request.onsuccess = function (event) {
        console.log("Password successfully update");

        //Operations to do after updating the password
        passwordUpdate.value = "";
        confirmPasswordUpdate.value = "";
        changePasswordContainer.style.display = "none";
        userArea();
    };

    request.onerror = function (event) {
        console.error("changeUserPassword: error updating the password: ", this.error);
    };

    tx.oncomplete = function() {
        console.log("changeUserPassword: tx completed");
        db.close();
        opened = false;
    };
};

//To validate the new password
function isPasswordValid(input){
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    return re.test(String(input)); //Will return true or false
};

/* Log out user area */

document.getElementById("logOutUser").addEventListener('click', (event) => {
    sessionStorage.clear();
    window.location.replace("./index.html");
});

console.log(sessionStorage.getItem('id')); //delete when everything works