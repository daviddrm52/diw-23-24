$( function() {
    $( "#post-it-orange, #post-it-purple" ).draggable();
    $( "#orange-droppable" ).droppable({
      accept: "#post-it-orange",
      classes: {
        "ui-droppable-active": "ui-state-active",
        "ui-droppable-hover": "ui-state-hover"
      },
      drop: function( event, ui ) {
        $( this )
          .addClass( "ui-state-highlight" )
          .find( "p" )
            .html( "Air Chiquin has been detected" );
      }
    });
  } );