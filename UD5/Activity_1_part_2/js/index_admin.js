var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
var database = "usersDB-David-Rueda-Madrid";
const DB_STORE_NAME = 'users';
const DB_VERSION = 2;
var db;
var opened = false;

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
            console.log("entrada")
        });
        document.getElementById("delete_"+users[i].id).addEventListener('click', (event) => {
            document.getElementById("delete-selected-user-container").style.display = "block";
            document.getElementById("id_deleting").innerHTML = users[i].id;
            document.getElementById("username_deleting").innerHTML = users[i].username;
        });
    }
};

/* Delete specific user area */

var deleteSelectedUserButton = document.getElementById("delete_selected_user");
var cancelDeleteSelectedUserButton = document.getElementById("cancel_delete_selected_user");

deleteSelectedUserButton.addEventListener('click', (event) => {
    deleteSelectedUser();
});

cancelDeleteSelectedUserButton.addEventListener('click', (event) => {
    document.getElementById("delete-selected-user-container").style.display = "none";
});

function deleteSelectedUser(event){
    console.log("deleteSelectedUser");
    var button_id = event.target.id;
    var user_id = document.getElementById(button_id).getAttribute("user_id");
    console.log(user_id)

    // openCreateDatabase(function(db){
    //     console.log(user_id);
    //     var tx = db.transaction(DB_STORE_NAME, "readwrite");
    //     var store = tx.objectStore(DB_STORE_NAME);

    //     //Deleting data in the ObjectStore
    //     var request = store.delete(parseInt(user_id));

    //     request.onsuccess = function (event){
    //         console.log("deleteLoggedUser: User deleted successfully " + user_id);

    //         //Operations that we want to do after deleting the user
    //         sessionStorage.clear();
    //         window.location.replace("./index.html");            
    //     };

    //     request.onerror = function (event) {
    //         console.error("deleteLoggedUser: error removing the user: ", event.target.errorCode);
    //     };

    //     tx.oncomplete = function(){
    //         console.log("deleteLoggedUser: tx completed");
    //         db.close();
    //         opened = false;
    //     };
    // });
};


//eventListener for when the form is send
window.addEventListener('load', (event) =>{
    verifyAdmin();
    adminData();
});

//Verify if the user logged is an admin
function verifyAdmin() {
    if(!sessionStorage.getItem('admin')){
        window.location.replace("./index.html");
    };
}