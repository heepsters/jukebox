/* 
Stop button doesnt work just there for asthetics :) everything else works great!
You will build a music player that will end up playing any mp3 you can find online.  
Encapsulate all of this functionality in a JavaScript object so that starting a song is as simple as calling Jukebox.play() 
*/
// Song object
function Song(name, songName, artist, picture) {
	this.name = name;
    this.songName = songName;
    this.artist = artist;
    this.picture = picture;
} 
// jukebox with playing abilities and also index for random functions
function Jukebox(){
	this.audio = document.getElementsByTagName('audio')[0];
	this.songs = [];
	this.songIndex = 0;
	this.play = function() {
		this.audio.play();
		this.setInfo();
	}
	this.pause = function() {
		this.audio.pause();
	}
	this.addSong = function(song) { //expects a song object
		this.songs.push(song);
	}
	this.randomSong = function() { // picks random song for both forwards and backwards and also changes info 
		this.songIndex = Math.floor((Math.random() * 8) + 1);
		this.audio.src = this.songs[this.songIndex].songName;
		this.play();
	}
	this.setInfo = function() {
		document.getElementsByTagName('h1')[0].innerText = this.songs[this.songIndex].name;
		document.getElementsByTagName('h2')[0].innerText = this.songs[this.songIndex].artist;
		document.getElementsByTagName('img')[0].src = this.songs[this.songIndex].picture;
	}
	this.next = function() { // changes song to the next song in playlist or array
		this.songIndex++;
		this.audio.src = this.songs[this.songIndex].songName;
		this.play();
	}
	this.previous = function() { // changes song to the previous song in playlist or array
		this.songIndex--;
		this.audio.src = this.songs[this.songIndex].songName;
		this.play();
	}
	this.loadSong = function(song){ // when loading song through clicking open my music this will load any song but not change the info
		var songObject = new Song("Don't Mind", song, "Sione Toki", "sione.jpg");
		this.audio.src = song;
		this.setInfo();
		this.play();
		this.addSong(songObject);
	}
}
// Playlist of songs, allows the user to queue up the next song
// You need an array of song objects and the ability to play, stop and pause a song. 
var juke = new Jukebox();

var firstSong = new Song("Don't Mind", "Don't Mind (T-MiX).mp3", "Sione Toki", "sione.jpg");
var secondSong = new Song("Strange", "Strange ft. A-RU$$.mp3", "A-Ru$$", "aruss.png");
var thirdSong = new Song("Puppy Love", "Puppy Love.mp3", "CROOSH", "croosh.jpg");
var fourthSong = new Song("Don't Mind", "Don't Mind (T-MiX).mp3", "Sione Toki", "sione.jpg");
var index = 0;

juke.addSong(firstSong);
juke.addSong(secondSong);
juke.addSong(thirdSong);
juke.addSong(fourthSong);
// Display at least one song on the page when the page loads
// Page has at least one song on load and can play a different song based on title
// Give the user the ability to play that song, without using the "built-in" play button. 
// Give the user the ability to stop that song without using the "built-in" stop button. 
document.getElementById('play').addEventListener('click', function(){
    if (juke.audio.paused){
    	juke.audio.play();
	}else {
  		juke.audio.pause();
	}
});

//the double arrow image on the right of play to generate random track
document.getElementById('next').addEventListener("click", function(){
   juke.randomSong() 
  });
document.getElementById('back').addEventListener("click", function(){
   juke.randomSong();
  });
// left and right arrow function to switch songs
document.addEventListener("keydown", keypress, false);
function keypress(e) {
	var keyCode = e.keyCode;
	if(keyCode == 37) { 
		juke.previous();
	}
	if(keyCode == 39) { 
		juke.next();
	}

} // hove effect to hide and show info bar and player bar
document.getElementById('jukebox1').addEventListener("mouseover", function(){
	document.getElementById('infobox').style.display = "block";
	document.getElementById('player').style.display = "block";
});
document.getElementById('player').addEventListener("mouseover", function(){
	document.getElementById('infobox').style.display = "block";
	document.getElementById('player').style.display = "block";
});
document.getElementById('infobox').addEventListener("mouseover", function(){
	document.getElementById('infobox').style.display = "block";
	document.getElementById('player').style.display = "block";
});
document.getElementById('jukebox1').addEventListener("mouseout", function(){
	document.getElementById('infobox').style.display = "none";
	document.getElementById('player').style.display = "none";
});
document.getElementById('player').addEventListener("mouseout", function(){
	document.getElementById('infobox').style.display = "none";
	document.getElementById('player').style.display = "none";
});
document.getElementById('infobox').addEventListener("mouseout", function(){
	document.getElementById('infobox').style.display = "none";
	document.getElementById('player').style.display = "none";
});

// replaces file path with value that audio can read and play
var file = document.getElementById("file");
file.addEventListener('change', function(){
	juke.loadSong(this.value.replace('C:\\fakepath\\', ''));
});



