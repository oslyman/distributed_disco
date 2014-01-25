var songs = ["rebel.m4a", "rebellion.mp3", "youmakeme.m4a", "zeggie.mp3"];
var names = ["Rebel Rebel - David Bowie", "Rebellion - Arcade Fire", "You Make Me Feel - Cobra Starship", "Zeggie - Afrojack"]
function init(){
	newtext = "Pick a song to play!\n"
	for (var i = 0; i<songs.length; i++){
		var name = names[i];
		var song = songs[i];
		newtext += "<a href=\"hoster?song=" + song.slice(0, song.indexOf(".")) + "&format=" + song.slice(song.indexOf(".") + 1, song.length) + "\"><p id=" + i + ">" + names[i] + "</p></a>";
	}
	document.getElementById("main").innerHTML=newtext;
	// for(var i = 0; i<songs.length; i++){
	// 	document.getElementById(i).onclick=gen_fun(songs[i])
	// }
}

function gen_fun(name){
	return function(){
			document.getElementById("player").innerHTML="<embed height=\"15\" width=\"300\" autoplay=\"true\" src=\"music/" + name+ "\">";
		}
}
init()