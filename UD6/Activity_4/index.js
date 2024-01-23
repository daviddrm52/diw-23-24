var orangeCounter = 0;
var purpleCounter = 0;

$(document).ready( function() {
    $( ".post-it-orange, .post-it-purple" ).draggable();
    $( "#orange-droppable" ).droppable({
      accept: ".post-it-orange",
      classes: {
        "ui-droppable-active": "ui-state-active",
        "ui-droppable-hover": "ui-state-hover"
      },
      drop: function( event, ui ) {
        orangeCounter++;
        $( this )
          .addClass( "ui-state-highlight" )
          .find( "p" )
          .html( "There are "+orangeCounter+" orange posts." );
      }
    });
    $( "#purple-droppable" ).droppable({
      accept: ".post-it-purple",
      classes: {
        "ui-droppable-active": "ui-state-active",
        "ui-droppable-hover": "ui-state-hover"
      },
      drop: function( event, ui ) {
        purpleCounter++;
        $( this )
          .addClass( "ui-state-highlight" )
          .find( "p" )
            .html( "There are "+purpleCounter+" purple posts." );
      }
    });
});

$("#post-it-generator").on("click", function() {
  test = "<div class='post-it-orange'><p></p></div>"
  $("main").append(test);
  $(".post-it-orange").draggable();
});