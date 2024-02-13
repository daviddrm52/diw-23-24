//Variables for checking if the name and email are with the guidelines
var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
var namePattern = /^[A-Z]/;

//Validating email without clicking submit button
$("#email").on("focus", function () {
    if($("#email").val().trim() === ''){
        $("#message").text("The email input is empty.");
    } else if(!emailPattern.test($("#email").val())){
        $("#message").text("Invalid email format.");
    } else {
        $("#message").empty();
    };
});

//Validating name without clicking submit button
$("#name").on("focus",function () { 
    if($("#name").val().trim() === ''){
        $("#message").text("The name input is empty");
    } else if(!namePattern.test($("#name").val())){
        $("#message").text("Mame must start with a capital letter.");
    } else {
        $("#message").empty();
    }
});

//Submit form button
$("#submitForm").on("click", function(){
    submitForm();
});

//Function to validate the name & email, and if all is good, to add to the select element
function submitForm() {
    if($("#email").val().trim() === ''){
        $("#message").text("The email input is empty.");
    } else if(!emailPattern.test($("#email").val())){
        $("#message").text("Invalid email format.");
    } else if($("#name").val().trim() === ''){
        $("#message").text("The name input is empty.");
    } else if(!namePattern.test($("#name").val())){
        $("#message").text("Mame must start with a capital letter.");
    } else {
        $("#message").empty();
        //For the creation of the element "select"
        if($("select").hasClass("selector")){
            $("select").append("<option>"+ $("#name").val() +" - "+ $("#email").val() +"</option>");
        } else {
            $("main").append("<select class='selector'> <option> Select an option... </option> </select>");
            $("select").append("<option>"+ $("#name").val() +" - "+ $("#email").val() +"</option>");
        };
    };
};