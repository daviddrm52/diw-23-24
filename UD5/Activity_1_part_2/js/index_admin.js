var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
var database = "usersDB-David-Rueda-Madrid";
const DB_STORE_NAME = 'users';
const DB_VERSION = 2;
var db;
var opened = false;

//
var deleteSelectedUserButton = document.getElementById("delete_selected_user");
var cancelDeleteSelectedUserButton = document.getElementById("cancel_delete_selected_user");
var editSelectedUserDataButton = document.getElementById("edit_selected_user_data");
var cancelEditSelectedUserDataButton = document.getElementById("cancel-edit-selected-user-data");
var resetUserPasswordButton = document.getElementById("reset_user_password");
var cancelResetUserPasswordButton = document.getElementById("cancel_reset_user_password");

//Variable to store the user data because of how IndexedDB works
var goodName;
var goodUsername;
var goodEmail;
var goodPassword;
var goodAvatar;
var goodAdmin;

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

    //onError handler
    request.onerror = (event) => {
        console.error("Error opening or creating a database, this error hits hard: ", event.target.errorCode);
    };
};
  
//sendDataForm
function adminData(){
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
            addUsersToHTML(result);
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
   
//Function to add the users to the HTML
function addUsersToHTML(users){
    var ul = document.getElementById("users-ul");
    
    ul.innerHTML = "";

    for (let i = 0; i < users.length; i++){
        ul.innerHTML += "<li> <ul> <li> <b> Id: </b>"+users[i].id+" </li> <li> <b> Name: </b>"+users[i].name+" </li><li><b> Username: </b>"+users[i].username+" </li><li><b> Email: </b>"+users[i].email+" </li><li><b> Admin privilegies: </b>"+users[i].admin+" </li> <li> <img src="+users[i].avatar +"> </li> <li> <button user_id="+users[i].id+" id=edit_"+users[i].id+"> Edit user </button> <button user_id="+users[i].id+" id=delete_"+users[i].id+"> Delete user </button> <button user_id="+users[i].id+" id=reset_password_"+users[i].id+"> Reset password </button> </li> </ul> </li>";
    };

    for (let i = 0; i < users.length; i++){
        document.getElementById("edit_"+users[i].id).addEventListener('click', (event) => {
            document.getElementById("edit-user-data-container").style.display = "block";
            document.getElementById("name").value = users[i].name;
            document.getElementById("username").value = users[i].username;
            document.getElementById("email").value = users[i].email;
            goodPassword = users[i].password;
            goodAvatar = users[i].avatar;
            goodAdmin = users[i].admin;
            editSelectedUserDataButton.setAttribute("user_id", users[i].id);
        });
        document.getElementById("delete_"+users[i].id).addEventListener('click', (event) => {
            document.getElementById("delete-selected-user-container").style.display = "block";
            document.getElementById("id_deleting").innerHTML = users[i].id;
            document.getElementById("username_deleting").innerHTML = users[i].username;
            deleteSelectedUserButton.setAttribute("user_id", users[i].id);
        });
        document.getElementById("reset_password_"+users[i].id).addEventListener('click', (event) => {
            document.getElementById("reset-user-password-container").style.display = "block";
            document.getElementById("id_reseting").innerHTML = users[i].id;
            document.getElementById("username_reseting").innerHTML = users[i].username;
            resetUserPasswordButton.setAttribute("user_id", users[i].id);
            goodName = users[i].name;
            goodUsername = users[i].username;
            goodEmail = users[i].email;
            goodAvatar = users[i].avatar;
            goodAdmin = users[i].admin;
        });
    }
};

/* Delete specific user area */
deleteSelectedUserButton.addEventListener('click', (event) => {
    deleteSelectedUser();
});

cancelDeleteSelectedUserButton.addEventListener('click', (event) => {
    document.getElementById("delete-selected-user-container").style.display = "none";
});

function deleteSelectedUser(event){
    console.log("deleteSelectedUser");
    var user_id = document.getElementById("delete_selected_user").getAttribute("user_id");
    console.log(user_id);

    openCreateDatabase(function(db){
        var tx = db.transaction(DB_STORE_NAME, "readwrite");
        var store = tx.objectStore(DB_STORE_NAME);

        //Deleting data in the ObjectStore
        var request = store.delete(parseInt(user_id));

        request.onsuccess = function (event){
            console.log("deleteLoggedUser: User deleted successfully " + user_id);

            //Operations that we want to do after deleting the user
            window.location.reload();
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

/* Reset user password area */
resetUserPasswordButton.addEventListener('click', (event) => {
    resetUserPassword();
});

cancelResetUserPasswordButton.addEventListener('click', (event) => {
    document.getElementById("reset-user-password-container").style.display = "none";
});

function resetUserPassword() {
    openCreateDatabase(function(db){
        resetPassword(db);
    });
};

function resetPassword(db) {
    var user_id = document.getElementById("reset_user_password").getAttribute("user_id");
    console.log(user_id);

    //The new password
    var resetedPassword = "0";
    //It's 0 because in the sign in if there is nothing in the input, will fail

    //To encrypt the good password 
    var hash = CryptoJS.MD5(resetedPassword);
    //Grab the values for the database
    var object = {id: parseInt(user_id), name: goodName, username: goodUsername, email: goodEmail, password: hash.toString(), avatar: goodAvatar, admin: goodAdmin};

    var tx = db.transaction(DB_STORE_NAME, "readwrite");
    var store = tx.objectStore(DB_STORE_NAME);

    //Update the user password in the ObjectStore
    request = store.put(object);

    request.onsuccess = function (event) {
        console.log("Password successfully reseted");

        //Operations to do after updating the password
        document.getElementById("reset-user-password-container").style.display = "none";
    };

    request.onerror = function (event) {
        console.error("resetPassword: error reseting the password: ", this.error);
    };

    tx.oncomplete = function() {
        console.log("resetPassword: tx completed");
        db.close();
        opened = false;
    };
};

/* Edit specific user data area  */
editSelectedUserDataButton.addEventListener('click', (event) => {
    editSelectedUserData();
});

cancelEditSelectedUserDataButton.addEventListener('click', (event) => {
    document.getElementById("edit-user-data-container").style.display = "none";
});

function editSelectedUserData() {
    openCreateDatabase(function(db){
        editUserData(db);
    });
};

function editUserData(db) {
    //In case something is not good
    var errorDetected = true;
    //Inputs of the form
    var user_id = document.getElementById("edit_selected_user_data").getAttribute("user_id");
    var nameUpdate = document.getElementById("name");
    var usernameUpdate = document.getElementById("username");
    var emailUpdate = document.getElementById("email");
    var avatarUpdate;
    //Error messages if something is not validated
    var nameError = document.getElementById("nameError");
    var usernameError = document.getElementById("usernameError");
    var emailError = document.getElementById("emailError");
    var avatarError = document.getElementById("avatarError");

    //Validation of the new data
    //Checking what image is selected
    if(document.getElementById("avatarCheckbox1").checked){
        imageSelector = document.querySelector("#ahri");
        avatarUpdate = imageSelector.getAttribute("src");
        avatarError.style.display = "none";
        errorDetected = false;
    } else if(document.getElementById("avatarCheckbox2").checked){
        imageSelector = document.querySelector("#kaisa");
        avatarUpdate = imageSelector.getAttribute("src");
        avatarError.style.display = "none";
        errorDetected = false;
    } else if(document.getElementById("avatarCheckbox3").checked){
        imageSelector = document.querySelector("#evelynn");
        avatarUpdate = imageSelector.getAttribute("src");
        avatarError.style.display = "none";
        errorDetected = false;
    } else {
        avatarError.innerText = "You have to select an avatar!";
        avatarError.style.display = "block";
        errorDetected = true;
    };
    //Validating name
    if(nameUpdate.value.trim() === ''){
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
    if(usernameUpdate.value.trim() === ''){
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
    if(emailUpdate.value === ''){
        emailError.innerText = "The email input is empty!";
        emailError.style.display = "block";
        errorDetected = true;
        console.log("Email is empty, not good...");   
    } else if(!isEmailValid(emailUpdate.value)){
        emailError.innerText = "The email is not valid!";
        emailError.style.display = "block";
        errorDetected = true;
        console.log("Email is not valid, not good..."); 
    } else{
        console.log("Email is correct");
        emailError.style.display = "none";
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

    var object = {id: parseInt(user_id), name: nameUpdate.value, username: usernameUpdate.value, email: emailUpdate.value, password: goodPassword, avatar: avatarUpdate, admin: goodAdmin};

    var tx = db.transaction(DB_STORE_NAME, "readwrite");
    var store = tx.objectStore(DB_STORE_NAME);

    //Updates the user personal data in the ObjectStore
    request = store.put(object);

    request.onsuccess = function (event) {
        console.log("User personal data successfully updated!");

        //Operations to do after updating the user data
        nameUpdate.value = "";
        usernameUpdate.value = "";
        emailUpdate.value = "";
        document.getElementById("edit-user-data-container").style.display = "none";
        window.location.reload();
    };

    request.onerror = function (event) {
        console.error("editUserData: Error updating data ", this.error)
    };

    tx.oncomplete = function () {
        console.log("editUserData: tx completed");
        db.close();
        opened = false;
    };
};


//eventListener for when the form is send
window.addEventListener('load', (event) =>{
    verifyAdmin();
    adminData();
});

//Verify if the user logged is an admin
function verifyAdmin() {
    if(sessionStorage.getItem('admin') == 'false'){
        window.location.replace("./index.html");
    };
};

//To validate the email
function isEmailValid(input){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(input).toLocaleLowerCase()); //Will return true or false
};

//What works: delete user, edit user, reset password
//What's left: index issues with non admin users.