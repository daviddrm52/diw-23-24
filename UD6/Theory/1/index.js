$(document).ready (function () {
    console.log("Document is ready");
    
    $("div:has(.highlight)").css("background-color", "yellow");
    
    $("div :contains(Ai Hoshino)").addClass("titulo");

    // $("main :hidden").show();

    $(":button").show();

    $("#sendInfo").on({
        "click": function(){
            console.log("Click has been detected");
        },
        "mouseover": function(){
        console.log("Mouse over has been detected");
    }});

    $("#sendInfo").on("click", {name: "Akane Kurokawa"}, test);
});

function test(event){
    console.log(event.data.name);
}