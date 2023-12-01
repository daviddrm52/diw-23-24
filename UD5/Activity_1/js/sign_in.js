var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
var database = "usersDB-David-Rueda-Madrid";
const DB_STORE_NAME = 'users';
const DB_VERSION = 2;
var db;
var opened = false;
//When the user clicks on "Sign in"
var singInData = document.querySelector("#signInForm");

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
            // compareLoginData(result);
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
   
//Function to compare the data 

//eventListener for when the form is send
window.addEventListener('load', (event) =>{
    singInData.addEventListener('click', (event) => {
        signInForm();
    });
});