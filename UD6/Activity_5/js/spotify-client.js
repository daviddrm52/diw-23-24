var client_id = 'x';
var client_secret = 'x';
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
    console.log(response);
    let placeholder = "https://www.scdn.co/i/_global/open-graph-default.png";
    $("#results").empty();
    $.each(response.artists.items, function(index) {
      $("#results").append('<h2 class="artist_name"> '+ response.artists.items[index].name+' </h2>');
      $("#results").append('<h3 class="artist_popularity"> Popularity of the artist: '+response.artists.items[index].popularity+'</h3> <br>');
      if($.isEmptyObject(response.artists.items[index].images)){
        $("#results").append('<a href="'+response.artists.items[index].external_urls.spotify+'"> <img class="artist-img" src="'+placeholder+'"> </img> </a>');
      } else {
        $("#results").append('<a href="'+response.artists.items[index].external_urls.spotify+'"> <img class="artist-img" src="'+response.artists.items[index].images[1].url+'"> </img> </a>');
      }
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
  });
};

//This fragment is the first thing that is loaded, when the $(document).ready
$(function () {
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

  $('#results').on('click', '.artistId', function () {
    spotify.getArtistById($(this).attr("data-id"));
  });

});