//General variables
var kiryuCounter = 0;

// JQuery things
$(document).ready (function(){
    console.log("Activity 2 - UD6 - David Rueda Madrid is ready");
    //Variables
    var numOfPars = Math.floor((Math.random() * (10 - 4 + 1)) + 4);
    var firstPairSelected;
    var secondPairSelected;
    var firstCardID;
    var secondCardID;
    var firstPairArray = [];
    var secondPairArray = [];
    console.log(numOfPars);
    for (jal = 1; jal < numOfPars+1; jal++){
        firstPairArray.push(jal);
        secondPairArray.push(jal);
    };
    //To randomize the array with the numbers
    var firstPair = randomCardNumber(firstPairArray);
    var secondPair = randomCardNumber(secondPairArray);

    //To print the randomized array into the page
    for(i = 0; i < firstPair.length; i++){
        $(".board").append("<div class='card-first' value='"+firstPair[i]+"' id='card-first-"+firstPair[i]+"'>&nbsp;</div>");
    }
    for(i = 0; i < secondPair.length; i++){
        $(".board").append("<div class='card-second' value='"+secondPair[i]+"' id='card-second-"+secondPair[i]+"'>&nbsp;</div>");
    }

    //When the user clicks in the top set of cards
    $(".card-first").on("click", function() {
        if(!$(this).hasClass("pair-correct")){
            kiryuCounter++;
            var cardValue = $(this).attr("value");
            firstCardID = $(this).attr("id");
            console.log(firstCardID);
            firstPairSelected = cardValue;
            $(this).html("<span>"+cardValue+"</span>");
            $(this).toggleClass("inactive");
            $("#message-first-card").html("最初のカードからの番号： "+ cardValue);
            checkCard(cardValue);
            if(firstPairSelected != null && secondPairSelected != null){
                checkPair(firstPairSelected, firstCardID, secondPairSelected, secondCardID);
            };
            setTimeout(() => {
                if(!$(this).hasClass("pair-correct")) {
                    $(this).toggleClass("inactive");
                    $(this).html("&nbsp;");
                }
                firstPairSelected = null;
            }, 750);
        }
    });
    
    //When the user clicks in the bottom set of cards
    $(".card-second").on("click", function() {
        if(!$(this).hasClass("pair-correct")){
            kiryuCounter++;
            var cardValue = $(this).attr("value");
            secondPairSelected = cardValue;
            secondCardID = $(this).attr("id");
            $(this).html("<span>"+cardValue+"</span>");
            $(this).toggleClass("inactive");
            $("#message-second-card").text("枚目のカードの番号："+ cardValue);
            checkCard(cardValue);
            if(firstPairSelected != null && secondPairSelected != null){
                checkPair(firstPairSelected, firstCardID, secondPairSelected, secondCardID);
            };
            setTimeout(() => {
                if(!$(this).hasClass("pair-correct")) {
                    $(this).toggleClass("inactive");
                    $(this).html("&nbsp;");
                }
                secondPairSelected = null;
            }, 750);
        }
    });
});

// FUNCTIONS

//Function to test the value of the card
function checkCard(card) {
    console.log("Value of the card: "+card);
    $("#kiryu").text("あなたは" +kiryuCounter+" 枚のカードをチェックしました");
}

//Function to randomize the cards (it works actually)
function randomCardNumber(array){
    var i = array.length, j = 0, temp;
    while(i--){
        j = Math.floor(Math.random() * (i+1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    };
    return array;
};

//Function to check if the top & bot set of selected cards pairs
function checkPair(first, idFirst, second, idSecond) {
    if (first === second){
        $("#message-pairing").text("2カードマッチ.");
        $("div#"+idFirst).addClass("pair-correct");
        $("div#"+idSecond).addClass("pair-correct");
    } else {
        $("#message-pairing").text("2枚のカードが一致しない.");
    };
};

//TODO
/*
    Waiting to put extras to the game 
*/

/**
 * Extra notes
 * 
 * The game is in japanese, it is NOT recomended to translate with Google in the same
 * webpage, will cause the numbers to change in the screen.
 * 
 * Why is in other language: i don't know, this is to verify that is made by daviddrm52
 */