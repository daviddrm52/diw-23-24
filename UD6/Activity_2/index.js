$(document).ready (function(){
    console.log("Document is ready");

    for(i = 0; i < 20; i++){
        $("#board").append("<div class='card' id='card-"+(i+1)+"'><h1>"+(i+1)+"</h1></div>");
    };

    $(".card").on("click", function() {
        var id = $(this).attr('id');
        console.log(id);
        $(this).toggleClass("inactive");
        setTimeout(() => {
            $(this).toggleClass("inactive");
        }, 1000);
    });
})