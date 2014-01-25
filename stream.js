var	fs = require("fs"),
	lame = require("lame"),
	Speaker = require("speaker");

function start(req, res){
	var stream = fs.createReadStream("songs/" + req.songName + ".mp3"),
		decoder = new lame.Decoder(),
		speaker = new Speaker();
	stream.pipe(decoder).pipe(speaker);
}