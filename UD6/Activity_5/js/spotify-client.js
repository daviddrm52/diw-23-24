var client_id= '';
var client_secret = '';
var access_token = '';


//We create the Spotify class with the API to make the call to
function Spotify() {
  this.apiUrl = 'https://api.spotify.com/';
}

//Search for information on an artist, adding the possibility of obtaining their albums.
Spotify.prototype.getArtist = function (artist) {
  $.ajax({
    type: "GET",
    url: this.apiUrl + 'v1/search?type=artist,track&q=' + artist,
    headers: {
      'Authorization' : 'Bearer ' + access_token
    },
  }).done( function(response){
    console.log(response);
    let placeholder = "https://www.scdn.co/i/_global/open-graph-default.png";
    $("#results").empty();
    $("#results").append("<div id='artists'> <h2> Artists </h2> </div>");
    $.each(response.artists.items, function(index) {
      if($.isEmptyObject(response.artists.items[index].images)){
        var artistImage = '<a href="'+response.artists.items[index].external_urls.spotify+'"> <img class="artist-img" src="'+placeholder+'"> </img> </a>';
      } else {
        var artistImage = '<a href="'+response.artists.items[index].external_urls.spotify+'"> <img class="artist-img" src="'+response.artists.items[index].images[1].url+'"> </img> </a>';
      }
      $("#artists").append("<div class='artist'> <h2> <a href='javascript:void(0)' class='artist-name' data-id='"+response.artists.items[index].id+"'> "+ response.artists.items[index].name+" </a> </h2> <h3 class='artist_popularity'> Popularity of the artist: "+response.artists.items[index].popularity+" </h3> "+artistImage+" </div>");
    });
    $("#results").append("<div id='songs'> <h2> Songs </h2> </div>");
    $.each(response.tracks.items, function(index) {
      if($.isEmptyObject(response.tracks.items[index].album.images)){
        var trackImage = '<a href="'+response.tracks.items[index].external_urls.spotify+'"> <img class="artist-img" src="'+placeholder+'"> </img> </a>';
      } else {
        var trackImage = '<a href="'+response.tracks.items[index].external_urls.spotify+'"> <img class="artist-img" src="'+response.tracks.items[index].album.images[1].url+'"> </img> </a>';
      }
      $("#songs").append("<div class='track'> <h2> <a href='javascript:void(0)' class='track-name' data-id='"+response.tracks.items[index].id+"'> "+ response.tracks.items[index].name+" </a> </h2> <h3 class='track_popularity'> Popularity of the song: "+response.tracks.items[index].popularity+" </h3> "+trackImage+" </div>");
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
    console.log(response);
    let placeholder = "https://www.scdn.co/i/_global/open-graph-default.png";
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
    $("#track-info").append("<div class='track'> "+trackImage+" <h2> "+ response.name+"</h2> <h3> Popularity of the track: "+response.popularity+" </h3> <h3> Album: "+response.album.name+" </h3> <h3> Artist: "+response.artists[0].name+" </h3> </div>");
    if(response.preview_url != null){
      $(".track").append("<audio controls autoplay> <source src='"+response.preview_url+"' type='audio/mp3'> </audio>")
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
      $("#albums-tracks").append("<div class='track'> <h2> "+ response.items[index].name+"</h2> </div>");
    });
  });
};

//This fragment is the first thing that is loaded, when the $(document).ready
$(function () {
  $.ajax({
    url: 'keys.json',
    dataType: 'json',
    success: function (data) {
      client_id = data.client_id;
      client_secret = data.client_secret;
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

  $('#bgetArtist').on('click', function () {
    if ($('#artistName').val().trim() === ''){
      displayError();
    } else {
      spotify.getArtist($('#artistName').val());
    }
  });

  $(document).on('click', '.track-name', function() {
    spotify.getTrackInfo($(this).attr("data-id"));
  })

  $(document).on('click', '.artist-name', function () {
    spotify.getArtistById($(this).attr("data-id"));
  });

  $(document).on('click', '.album-name', function () {
    spotify.getTracksfromAlbumId($(this).attr("data-id"));
  })
});

function displayError() {
  $("#results").empty();
  $("#results").append("<div class='search-error'> <h2> No artist or song was founded! </h2> </div>");
};