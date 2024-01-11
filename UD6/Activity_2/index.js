$(document).ready (function(){
    console.log("Document is ready");

    let kiryu; //Kiryu best driver from Yakuza 5 kek

    for(i = 0; i < 20; i++){
        kiryu = Math.floor((Math.random() * 10) + 1);
        $(".board").append("<div class='card' value='"+kiryu+"' id='card-"+kiryu+"'></div>");
    };

    $(".card").on("click", function() {
        var cardValue = $(this).attr("value");
        $(this).text(cardValue);
        $(this).toggleClass("inactive");
        $("#message").text("上次检查的卡号: "+ cardValue);
        setTimeout(() => {
            $(this).toggleClass("inactive");
            $(this).text("");
        }, 1000);
    });
});