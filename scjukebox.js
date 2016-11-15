/////////////////////////////////////////// Sound Clound API project \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
/* 
1.Play a track off of SoundCloud based on its track ID*/
function Jukebox() {
  //Initialize with the client id when the object instance is made
  SC.initialize({
    client_id: 'f665fc458615b821cdf1a26b6d1657f6'
  });
  this.playlist = null;
  this.currentTrackStream = null;
  this.currentSong = null;
  this.songIndex = 0;
  _this = this;

  SC.get("/tracks",{
    q: 'chris brown'
  }).then(function(playlist) {
    console.log(playlist);
    _this.playlist = playlist;
    _this.currentSong = _this.playlist[_this.songIndex];
    _this.currentTrackStream = SC.stream('/tracks/' + _this.currentSong.id);
  });
  this.play = function(){
    this.currentTrackStream.then(function(player){
      player.play();
    });
  }
  this.pause = function(){ // 2.Pause the currently playing track
    this.currentTrackStream.then(function(player){
      player.pause();
    });
  } // 
    this.next = function(){  
    if ((this.songIndex + 1) < this.playlist.length - 1) {
      this.songIndex++;
      this.currentSong = this.playlist[this.songIndex];
      this.currentTrackStream = SC.stream('/tracks/' + this.currentSong.id);
      this.play();
      this.displayInfo();
      $(document).focus();
      return true;
    }
    return false; 
  } // to get information and switch to the next track
  this.previous = function(){
    if ((this.songIndex - 1) > 0) {
      this.songIndex--;
      this.currentSong = this.playlist[this.songIndex];
      this.currentTrackStream = SC.stream('/tracks/' + this.currentSong.id);
      this.play();
      this.displayInfo();
      $(document).focus();
      return true;
    }
    return false;
  }
// Artist name with link to his/her profile page Title with link to track's page Description, 
  this.displayInfo = function(){
    $('.title').text(this.currentSong.title);
    $('.artist-name').text(this.currentSong.user.username);
    $('#description').text(this.currentSong.description);
// genre and release date Artwork
    var releaseDate = this.currentSong.release_month + '.' + this.currentSong.release_day + '.' + this.currentSong.release_year;
    var info = "Genre: " + this.currentSong.genre + " Released Date: " + releaseDate;
    var link = this.currentSong.permalink_url;
    $('.info').text(info);
    $('#artwork').attr('src', this.currentSong.artwork_url);
    $('#link').html('<a target="_blank" href="' + link + '">' + this.currentSong.title + '</a>');

  }
}
$(document).ready(function(){
  var juke = new Jukebox();
  $(document).keyup(function(e){
    if (e.key === " ") { // use spacebar to play
      juke.play();
      juke.displayInfo();
    }
    if (e.key === "p") { // use "p" to pause
      juke.pause();
    }
    if (e.which === 37) { //  use left arrow to go back one song
      if(!juke.previous()){
      }
    }
    if (e.which === 39) { // use right arrow to forward one song
      if(!juke.next()){
      }
    }
  });
});