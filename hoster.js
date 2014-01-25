var songs = ["rebel.m4a", "rebellion.mp3", "youmakeme.m4a", "zeggie.mp3"];
var names = ["Rebel Rebel - David Bowie", "Rebellion - Arcade Fire", "You Make Me Feel - Cobra Starship", "Zeggie - Afrojack"]
function init(){
	newtext = "Pick a song to play!\n"
	for (var i = 0; i<songs.length; i++){
		newtext += "<p id=" + i + ">" + names[i] + "</p>";
	}
	document.getElementById("main").innerHTML=newtext;
	for(var i = 0; i<songs.length; i++){
		document.getElementById(i).onclick=gen_fun(songs[i])
	}
}

function gen_fun(name){
	return function(){
			document.getElementById("player").innerHTML="<embed height=\"15\" width=\"300\" autoplay=\"true\" src=\"music/" + name+ "\">";
		}
}
init()