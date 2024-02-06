var client_id= '';
var client_secret = '';
var access_token = '';
// The placeholder image is a Boeing 777-246 of Japan Airlines (JA773J, Tokyo 2020 special livery) (now retired)
let placeholder = "https://cdn.jetphotos.com/full/5/28562_1578762989.jpg";

//We create the Spotify class with the API to make the call to
function Spotify() {
  this.apiUrl = 'https://api.spotify.com/';
}

//Search for information on an artist and the songs.
Spotify.prototype.getArtist = function (artist) {
  $.ajax({
    type: "GET",
    url: this.apiUrl + 'v1/search?type=artist,track&q=' + artist,
    headers: {
      'Authorization' : 'Bearer ' + access_token
    },
  }).done( function(response){
    // console.log(response);
    $("#results").empty();
    $("#results").append("<div id='artists'> <h2> Artists </h2> </div>");
    $.each(response.artists.items, function(index) {
      if($.isEmptyObject(response.artists.items[index].images)){
        var artistImage = '<a href="'+response.artists.items[index].external_urls.spotify+'"> <img class="artist-img" src="'+placeholder+'"> </img> </a>';
      } else {
        var artistImage = '<a href="'+response.artists.items[index].external_urls.spotify+'"> <img class="artist-img" src="'+response.artists.items[index].images[1].url+'"> </img> </a>';
      }
      $("#artists").append("<div class='artist'> <h2> <a href='javascript:void(0)' class='artist-name' data-id='"+response.artists.items[index].id+"'> "+ response.artists.items[index].name+" </a> </h2> "+artistImage+" <h3 class='artist_popularity'> Popularity of the artist: "+response.artists.items[index].popularity+" </h3> </div>");
    });
    $("#results").append("<div id='songs'> <h2> Songs </h2> </div>");
    $.each(response.tracks.items, function(index) {
      if($.isEmptyObject(response.tracks.items[index].album.images)){
        var trackImage = '<a href="'+response.tracks.items[index].external_urls.spotify+'"> <img class="artist-img" src="'+placeholder+'"> </img> </a>';
      } else {
        var trackImage = '<a href="'+response.tracks.items[index].external_urls.spotify+'"> <img class="artist-img" src="'+response.tracks.items[index].album.images[1].url+'"> </img> </a>';
      }
      $("#songs").append("<div class='tracks'> <h2> <a href='javascript:void(0)' class='track-name' data-id='"+response.tracks.items[index].id+"'> "+ response.tracks.items[index].name+" </a> </h2> "+trackImage+" <h3 class='track_popularity'> Popularity of the song: "+response.tracks.items[index].popularity+" </h3> </div>");
    });
  });
};

//Search the albums of an artist, given the id of the artist
Spotify.prototype.getArtistById = function (artistId) {
  $.ajax({
    type: "GET",
    url: this.apiUrl + 'v1/artists/' + artistId + '/albums',
    headers: {
      'Authorization' : 'Bearer ' + access_token
    },
  }).done( function(response){
    // console.log(response);
    $("#results").empty();
    $("#results").append("<div id='artist-albums'> <h2> Albums </h2> </div>");
    $.each(response.items, function(index) {
      if($.isEmptyObject(response.items[index].images)){
        var albumImage = '<a href="'+response.items[index].external_urls.spotify+'"> <img class="artist-img" src="'+placeholder+'"> </img> </a>';
      } else {
        var albumImage = '<a href="'+response.items[index].external_urls.spotify+'"> <img class="artist-img" src="'+response.items[index].images[1].url+'"> </img> </a>';
      }
      $("#artist-albums").append("<div class='album'> <h2> <a href='javascript:void(0)' class='album-name' data-id='"+response.items[index].id+"'> "+ response.items[index].name+" </a> </h2> "+albumImage+" </div>");
    });
  });
};

//Display the info about the song, given the track id
Spotify.prototype.getTrackInfo = function (trackId) {
  $.ajax({
    type: "GET",
    url: this.apiUrl + 'v1/tracks/' + trackId,
    headers: {
      'Authorization' : 'Bearer ' + access_token
    },
  }).done( function(response){
    console.log(response);
    $("#results").empty();
    $("#results").append("<div id='track-info'> <h2> Information about the track </h2> </div>");
    if($.isEmptyObject(response.album.images)){
      var trackImage = '<a href="'+response.external_urls.spotify+'"> <img class="artist-img" src="'+placeholder+'"> </img> </a>';
    } else {
      var trackImage = '<a href="'+response.external_urls.spotify+'"> <img class="artist-img" src="'+response.album.images[1].url+'"> </img> </a>';
    }
    $("#track-info").append("<div class='track-information'> <h2> "+ response.name+"</h2> "+trackImage+" <h3> Popularity of the track: "+response.popularity+" </h3> <h3> Album: "+response.album.name+" </h3> <h3> Artist: "+response.artists[0].name+" </h3> </div>");
    if(response.preview_url != null){
      $(".track-information").append("<p> Preview of the song </p> <audio controls autoplay> <source src='"+response.preview_url+"' type='audio/mp3'> </audio>")
    };
  });
};

//Display all the songs of the album, given the album id
Spotify.prototype.getTracksfromAlbumId = function (albumId) {
  $.ajax({
    type: "GET",
    url: this.apiUrl + 'v1/albums/' + albumId + '/tracks',
    headers: {
      'Authorization' : 'Bearer ' + access_token
    },
  }).done( function(response){
    console.log(response);
    $("#results").empty();
    $("#results").append("<div id='albums-tracks'> <h2> Songs in the album </h2> </div>");
    $.each(response.items, function(index) {
      if(response.items[index].preview_url != null){
        var trackPreview = "<p> Preview of the song </p> <audio controls> <source src='"+response.items[index].preview_url+"' type='audio/mp3'> </audio>";
      } else {
        var trackPreview = "<p> There is no preview of the track available.</p>"
      }
      $("#albums-tracks").append("<div class='track'> <h2> "+ response.items[index].name+"</h2> "+trackPreview+" </div>");

    });
  });
};

//This fragment is the first thing that is loaded, when the $(document).ready
$(function () {
  //AJAX function to load the client_id & client_secret credentials (for security reasons there are outside this file)
  $.ajax({
    url: 'keys.json',
    dataType: 'json',
    success: function (data) {
      client_id = data.client_id;
      client_secret = data.client_secret;
      //This function will get the access token
      $.ajax({
        type: "POST",
        url: "https://accounts.spotify.com/api/token",
        beforeSend: function (xhr) {
          xhr.setRequestHeader ("Authorization", "Basic " + btoa(client_id + ":" + client_secret));
        },
        dataType: "json",
        data: { grant_type: "client_credentials" }
      }).done( function(response) {    
        access_token = response.access_token;    
      });
    }
  });
  
  var spotify = new Spotify();

  //Button when clicked, will search for artists and tracks with the value of the input
  $('#bgetArtist').on('click', function () {
    if ($('#artistName').val().trim() === ''){
      displayError();
    } else {
      spotify.getArtist($('#artistName').val());
    }
  });

  //When the user clicks the track name, will display basic info about the track
  $(document).on('click', '.track-name', function() {
    spotify.getTrackInfo($(this).attr("data-id"));
  })

  //When the user clicks the artist name, will display the artists albums
  $(document).on('click', '.artist-name', function () {
    spotify.getArtistById($(this).attr("data-id"));
  });

  //When the user clicks the album name, will display all the songs that belong to that album
  $(document).on('click', '.album-name', function () {
    spotify.getTracksfromAlbumId($(this).attr("data-id"));
  })
});

//Function in case there is nothing in the input
function displayError() {
  $("#results").empty();
  $("#results").append("<div class='search-error'> <h2> No artist or song was founded! </h2> </div>");
};