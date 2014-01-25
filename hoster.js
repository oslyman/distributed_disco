document.getElementById("play").onclick=function(){
	//document.getElementById("main").innerHTML="New text!";
	document.getElementById("main").innerHTML="<embed height=\"15\" width=\"300\" src=\"music/rebel.m4a\">"
	
}


var context;
window.addEventListener('load', init, false);

function init() {
	try {
		window.AudioContext = window.AudioContext||window.webkitAudioContext;
		context = new AudioContext();
	}
	catch(e) {
		alert('Web Audio API is not supported in this browser');
	}
}

var songBuffer = null;

function loadSong(url) {
	var request = new XMLHttpRequest();
	request.open('GET', url, false);
	request.responseType = 'arraybuffer';

	request.onload = function() {
		context.decodeAudioData(request.response, function(buffer) {
			songBuffer = buffer;
		}, onError);
	}
	request.send();
}

function playSong(buffer) {
	var source = context.createBufferSource();
	source.buffer = buffer;
	source.connect(context.destination);
	source.start();
}
