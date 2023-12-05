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
function userArea(){
    openCreateDatabase(function(db){
        getUserData(db);

    });
};

function getUserData(db){
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

function displayUserInfo(record) {
    document.querySelector("#avatar").src = record.avatar;
    document.getElementById("name").innerHTML = record.name;
    document.getElementById("username").innerHTML = record.username;
    document.getElementById("email").innerHTML = record.email; 
};

//eventListener for when the form is send
window.addEventListener('load', (event) =>{
    verifyUser();
    userArea();
});

document.getElementById("logOutUser").addEventListener('click', (event) => {
    sessionStorage.clear();
    window.location.replace("./index.html");
});

function verifyUser() {
    if(sessionStorage.getItem('id') == null){
        window.location.replace("./index.html");
    }
}

console.log(sessionStorage.getItem('id'));