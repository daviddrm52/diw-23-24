window.onload = function() {
    openDatabase();
};

function openDatabase() {
    // Opening the database
    const request = window.indexedDB.open("usersDB", 1);
    let db;

    //onError handler
    request.onerror = (event) => {
        console.error("The web browser doesn't want to use indexedDB, this hits hard");
    };

    //onsuccess handler (works)
    request.onsuccess = (event) => {
        db = event.target.result;
        console.log("database opened");
    };

    //onupgradeneeded handler (this is for the first time the db is created)(works)
    request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const objectStore = db.createObjectStore("users", {keyPath: "id", autoIncrement: true});
        objectStore.createIndex("name", "name", {unique: false});
        objectStore.createIndex("username", "username", {unique: true});
        objectStore.createIndex("email", "email", {unique: true});
        objectStore.createIndex("password", "password", {unique: false});
        console.log("Index created: name, username, email, password");

        //Data for the example
        const userData = [
            {name: "Crewmate", username: "Crewmate_good_18", email: "crewmate_amongus@gmail.com", password: "12345678"},
            {name: "Impostor", username: "Impostor_bad_43", email: "impostor_amongus@gmail.com", password: "87654321"},
        ];
        //oncomplete to finish the operation, and to add data
        objectStore.transaction.oncomplete = (event) => {
            const userObjectStore = db.transaction("users", "readwrite").objectStore("users");
            userData.forEach((user) => {
                userObjectStore.add(user);
            });
        };
    };
};

function addUserFromForm(db) {
    var name = document.getElementById("name");
    var username = document.getElementById("username");
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var object = {name: name.value, username: username.value, email: email.value, password: password.value};

    //Start a new transaction, this is perhaps pepega
    var tx = db.transaction("users", "readwrite");
    var store = tx.objectStore("users");

    try {
        store.add(object);
    } catch (e) {
        console.log("Catch");
    };

    request.onsuccess = (event) => {
        console.log("addUserFromForm: Data insertion successfully done. Id: "+event.target.result);
    };

    request.onerror = (event) => {
        console.log("addUserFromForm: error creating data", this.error);
    };

    request.oncomplete = (event) => {
        console.log("transaction completed");
    }
};