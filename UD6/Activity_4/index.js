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

    $(document).on("click", ".delete-post-it-button", function(){
      postIiIdentificator = $(this).parent().parent().attr("id");
      console.log(postIiIdentificator);
      $("#delete-post-it-dialog").dialog("open");
    });
    
    $("#delete-post-it-dialog").dialog({
      autoOpen: false,
      resizable: false,
      height: "auto",
      width: 400,
      modal: true,
      buttons: {
        "Delete post-it": function() {
          $("#"+postIiIdentificator).remove();
          console.log("Post-it with "+postIiIdentificator+" id was removed");
          $(this).dialog("close");
        },
        Cancel: function() {
          console.log("Delete of the post-it canceled");
          $(this).dialog("close");
        }
      },
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "explode",
        duration: 1000
      }
    });

    $("#post-it-generator").on("click", function() {
      randomPostIt = Math.floor((Math.random() * 2) + 1);
      if(randomPostIt === 1) {
        orangeID++;
        $("main").append("<div class='post-it-orange' id='orange-'"+orangeID+"><p><button class='minimize-post-it'>_</button> <button class='maximize-post-it'>※</button> <button class='delete-post-it-button'>X</button></p><textarea></textarea></div>");
        $(".post-it-orange").draggable();
      } else {
        purpleID++;
        $("main").append("<div class='post-it-purple' id='purple-'"+purpleID+"><p><button class='minimize-post-it'>_</button> <button class='maximize-post-it'>※</button> <button class='delete-post-it-button'>X</button></p><textarea></textarea></div>");
        $(".post-it-purple").draggable();
      }
    });
});