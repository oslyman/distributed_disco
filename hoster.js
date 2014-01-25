document.getElementById("play").onclick=function(){
	//document.getElementById("main").innerHTML="New text!";
	//document.getElementById("main").innerHTML="<embed height=\"15\" width=\"300\" src=\"music/rebel.m4a\">"
	init();
	loadSong("music/rebel.m4a");
	playSong(songBuffer);
}
