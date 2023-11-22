window.onload = function(onDbCompleted) {
    // Opening the database
    const request = window.indexedDB.open("usersDB", 1);
    let db;

    //onError handler
    request.onerror = (event) => {
        console.error("The web browser doesn't want to use indexedDB, this hits hard");
    };

    //onsuccess handler
    request.onsuccess = (event) => {
        db = event.target.result;
        console.log("database opened");
    };

    request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const objectStore = db.createObjectStore("users", {keyPath: "id"});

    };
}