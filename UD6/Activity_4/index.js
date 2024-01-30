//General variables
var orangeCounter = 0;
var purpleCounter = 0;
var orangeID = 1;
var purpleID = 1;

$(document).ready( function() {
  $( ".post-it-orange, .post-it-purple" ).draggable();
  $( "#orange-droppable" ).droppable({
    accept: ".post-it-orange",
    // When the user drops the post-it into the droppable
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
    // When the user drags out the post-it of the droppable
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
    // When the user drops the post-it into the droppable
    drop: function(event, ui) {
      purpleIdentificator = ui.draggable.prop("id");
      if($("div#"+purpleIdentificator).hasClass("purple-counted")){
        console.log("This post was in the droppable...");
      } else {
        purpleCounter++;
        $("div#"+purpleIdentificator).addClass("purple-counted");
        $(this).find("p").html( "There are "+purpleCounter+" purple posts." );
      }
    },
    // When the user drags out the post-it of the droppable
    out: function(event, ui) {
      purpleIdentificator = ui.draggable.prop("id");
      if($("div#"+purpleIdentificator).hasClass("purple-counted")){
        purpleCounter--;
        $("div#"+purpleIdentificator).removeClass("purple-counted");
        $(this).find("p").html("There are "+purpleCounter+" purple posts.");
      }
    }
  });

  // Delete post-it button
  $(document).on("click", ".delete-post-it-button", function(){
    postItIdentificator = $(this).parent().parent().attr("id");
    $("#delete-post-it-dialog").dialog("open");
  });

  // Minimize post-it button
  $(document).on("click", ".minimize-post-it", function(){
    postItIdentificator = $(this).parent().parent().attr("id");
    $("div#"+postItIdentificator).removeClass("maximized");
    $("div#"+postItIdentificator).addClass("minimized");
  });

  // Maximize post-it button
  $(document).on("click", ".maximize-post-it", function(){
    postItIdentificator = $(this).parent().parent().attr("id");
    $("div#"+postItIdentificator).removeClass("minimized");
    $("div#"+postItIdentificator).addClass("maximized");
  });

  // Confirm dialog that will appear when the user wants to delete the post-it
  $("#delete-post-it-dialog").dialog({
    autoOpen: false,
    resizable: false,
    height: "auto",
    width: 400,
    modal: true,
    buttons: {
      "Delete post-it": function() {
        // If the post-it that has to be deleted is in the droppable (orange post-it)
        if($("div#"+postItIdentificator).hasClass("orange-counted")){
          orangeCounter--;
          $("#orange-droppable").find("p").html("There are "+orangeCounter+" orange posts.");
        };
        // If the post-it that has to be deleted is in the droppable (purple post-it)
        if($("div#"+postItIdentificator).hasClass("purple-counted")){
          purpleCounter--;
          $("#purple-droppable").find("p").html("There are "+purpleCounter+" purple posts.");
        };
        $("#"+postItIdentificator).remove();
        console.log("Post-it with "+postItIdentificator+" id was removed");
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

  // Generate post-it button
  $("#post-it-generator").on("click", function() {
    randomPostIt = Math.floor((Math.random() * 2) + 1);
    if(randomPostIt === 1) {
      orangeID++;
      $("main").append("<div class='post-it-orange maximized' id='orange-"+orangeID+"'><p><button class='minimize-post-it'><span class='material-symbols-outlined'>minimize</span></button><button class='maximize-post-it'><span class='material-symbols-outlined'>maximize</span></button><button class='delete-post-it-button'><span class='material-symbols-outlined'>close</span></button></p><textarea maxlength='140'></textarea></div>");
      $(".post-it-orange").draggable();
    } else {
      purpleID++;
      $("main").append("<div class='post-it-purple maximized' id='purple-"+purpleID+"'><p><button class='minimize-post-it'><span class='material-symbols-outlined'>minimize</span></button><button class='maximize-post-it'><span class='material-symbols-outlined'>maximize</span></button><button class='delete-post-it-button'><span class='material-symbols-outlined'>close</span></button></p><textarea maxlength='140'></textarea></div>");
      $(".post-it-purple").draggable();
    }
  });
});