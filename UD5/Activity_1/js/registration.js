var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
var database = "usersDB";
const DB_STORE_NAME = 'users';
const DB_VERSION = 1;
var db
var opened = false;
var sendData = document.querySelector("#sendDataForm");

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
    var name = document.getElementById("name");
    var username = document.getElementById("username");
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    var object = {name: name.value, username: username.value, email: email.value, password: password.value};

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


//eventListener for when the form is send
window.addEventListener('load', (event) =>{
    sendData.addEventListener('click', (event) => {
        sendDataForm();
    });
});