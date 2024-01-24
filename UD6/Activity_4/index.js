var orangeCounter = 0;
var purpleCounter = 0;
var orangeID = 1;
var purpleID = 1;


$(document).ready( function() {
    $( ".post-it-orange, .post-it-purple" ).draggable();
    $( "#orange-droppable" ).droppable({
      accept: ".post-it-orange",
      drop: function(event, ui) {
        orangeIdentificator = ui.draggable.prop("id");
        if($("div#"+orangeIdentificator).hasClass("orange-counted")){
          console.log("This post was in the droppable...");
        } else {
          orangeCounter++;
          $("div#"+orangeIdentificator).addClass("orange-counted");
          $(this).find("p").html("There are "+orangeCounter+" orange posts.");
        }
      },
      out: function( event, ui ) {
        orangeIdentificator = ui.draggable.prop("id");
        if($("div#"+orangeIdentificator).hasClass("orange-counted")){
          orangeCounter--;
          $("div#"+orangeIdentificator).removeClass("orange-counted");
          $(this).find("p").html("There are "+orangeCounter+" orange posts.");
        }
      }
    });
    $( "#purple-droppable" ).droppable({
      accept: ".post-it-purple",
      drop: function(event, ui) {
        purpleIdentificator = ui.draggable.prop("id");
        if($("div#"+purpleIdentificator).hasClass("purple-counted")){
          console.log("This post was in the droppable...");
        } else {
          purpleCounter++;
          $("div#"+purpleIdentificator).addClass("purple-counted");
          $(this).find( "p" ).html( "There are "+purpleCounter+" purple posts." );
        }
      },
      out: function(event, ui) {
        purpleIdentificator = ui.draggable.prop("id");
        if($("div#"+purpleIdentificator).hasClass("purple-counted")){
          purpleCounter--;
          $("div#"+purpleIdentificator).removeClass("purple-counted");
          $(this).find("p").html("There are "+purpleCounter+" purple posts.");
        }
      }
    });
});

$("#post-it-generator").on("click", function() {
  randomPostIt = Math.floor((Math.random() * 2) + 1);
  if(randomPostIt === 1) {
    orangeID++;
    orangePost = "<div class='post-it-orange' id='orange-"+orangeID+"'><p></p></div>"
    $("main").append(orangePost);
    $(".post-it-orange").draggable();
  } else {
    purpleID++;
    $("main").append("<div class='post-it-purple' id='purple-"+purpleID+"'><p></p></div>");
    $(".post-it-purple").draggable();
  }
});