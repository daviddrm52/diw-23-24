var client_id= 'be6e01e8304449ce9046c615d8a5a57d';
var client_secret = 'c97b065446164965881b98ae75457e50';
var access_token = '';


//We create the Spotify class with the API to make the call to
function Spotify() {
  this.apiUrl = 'https://api.spotify.com/';
}

//Search for information on an artist, adding the possibility of obtaining their albums.
Spotify.prototype.getArtist = function (artist) {
  $.ajax({
    type: "GET",
    url: this.apiUrl + 'v1/search?type=artist&q=' + artist,
    headers: {
      'Authorization' : 'Bearer ' + access_token
    },
  }).done( function(response){
    console.log(response.artists.items[0].uri);
    console.log(response);
    let placeholder = "https://www.scdn.co/i/_global/open-graph-default.png";
    $("#results").empty();
    $("#results").append("<div id='artists'> </div>");
    $.each(response.artists.items, function(index) {
      if($.isEmptyObject(response.artists.items[index].images)){
        var artistImage = '<a href="'+response.artists.items[index].external_urls.spotify+'"> <img class="artist-img" src="'+placeholder+'"> </img> </a>';
      } else {
        var artistImage = '<a href="'+response.artists.items[index].external_urls.spotify+'"> <img class="artist-img" src="'+response.artists.items[index].images[1].url+'"> </img> </a>';
      }
      $("#artists").append("<div class='artist'> <h2> <a href='javascript:void(0)' class='artist-name' data-id='"+response.artists.items[index].id+"'> "+ response.artists.items[index].name+" </a> </h2> <h3 class='artist_popularity'> Popularity of the artist: "+response.artists.items[index].popularity+" </h3> "+artistImage+" </div>");
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
    $("#results").append("<div id='artist-albums'> </div>");
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
    $("#results").append("<div id='albums-tracks'> </div>");
    $.each(response.items, function(index) {
      $("#albums-tracks").append("<div class='track'> <h2> "+ response.items[index].name+"</h2> </div>");
    });
  });
}

//This fragment is the first thing that is loaded, when the $(document).ready
$(function () {
  $.ajax({
    url: 'keys.json',
    dataType: 'json',
    success: function (data) {
      client_id = data.client_id;
      client_secret = data.client_secret;
    }
  });

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
  
  var spotify = new Spotify();

  $('#bgetArtist').on('click', function () {
    spotify.getArtist($('#artistName').val());
  });

  $(document).on('click', '.artist-name', function () {
    spotify.getArtistById($(this).attr("data-id"));
  });

  $(document).on('click', '.album-name', function () {
    spotify.getTracksfromAlbumId($(this).attr("data-id"));
  })
});