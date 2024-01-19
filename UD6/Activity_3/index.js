$(document).ready(function () {
    console.log("Document is ready");
    $("textArea").countCharacters();
    //This work around doesn't work
    // $("#firstTextArea").countCharacters();
    // $("#secondTextArea").countCharacters();
});

$.fn.countCharacters = function (){
    //For the first text area
    var A346 = $("#firstTextArea").val().length;
    //This will add the span after the text area
    $("#firstTextArea").after("<h4><span id='spanair'></span></h4>");
    //We use data() to store the variable that stores the length of the value inside the text area
    $("form").data("test", A346);
    $("#spanair").html($("form").data("test")+" characters");
    //This is to update the span when the user writes inside the text area
    $("#firstTextArea").keyup(function () {
        A346 = $("#firstTextArea").val().length;
        $("form").data("test", A346);
        $("#spanair").html($("form").data("test")+" characters");
    });
    //For the second text area
    var B77L = $("#secondTextArea").val().length;
    //This will add the span after the text area
    $("#secondTextArea").after("<h4><span id='spantax'></span></h4>");
    //We use data() to store the variable that stores the length of the value inside the text area
    $("form").data("test", B77L);
    $("#spantax").html($("form").data("test")+" characters");
    //This is to update the span when the user writes inside the text area
    $("#secondTextArea").keyup(function() {
        B77L = $("#secondTextArea").val().length;
        $("form").data("test", B77L);
        $("#spantax").html($("form").data("test")+" characters");
    });
};

/* Notes:
 * 
 * A346 is the ICAO code for the Airbus A340-600
 * B77L is the ICAO code for the Boeing 777-200LR & the Boeing 777F
 */

// Base plugin (it works with one text area, but with two, it's not working)
// $.fn.countCharacters = function (){
//     //For the first text area
//     var textVal = $(this).val().length;
//     $(this).after("<h4><span></span></h4>");
//     //We use data() to store the variable that stores the length of the value inside the text area
//     $("form").data("test", textVal);
//     $("span").html($("form").data("test")+" characters");
//     //This is to update the span when the user writes inside the text area
//     $(this).keyup(function () {
//         textVal = $(this).val().length;
//         $("form").data("test", textVal);
//         $("span").html($("form").data("test")+" characters");
//     });
// };