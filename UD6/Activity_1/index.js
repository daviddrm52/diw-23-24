$(document).ready (function () {
    console.log("Document is ready");
    $("#sumButton").on("click", function() {
        if($.isNumeric($("#firstInput").val()) && $.isNumeric($("#secondInput").val())){
            $("#userInfo").text("The values are correct");
            firstInput = parseInt($("#firstInput").val());
            secondInput = parseInt($("#secondInput").val());
            result = firstInput + secondInput;
            $("#result").text("The result of the calculation is " + result);
        } else {
            $("#userInfo").text("The values are not a number!");
        };
    });
});