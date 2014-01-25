var	http = require('http'),
	server = http.createServer(),
	url = require('url'),
	fs = require("fs"),
	stream,
	lame = require("lame"),
	Speaker = require("speaker"),
	decoder = new lame.Decoder(),
	encoder = new lame.Encoder({channels: 2, bitDepth:16, sampleRate:44100});

server.on('request', handleRequest);
server.listen(8000);

var clients = [];

// encoder.on("data", function(data){
// 	sendData(data);
// });

function handleRequest(req, res){
	console.log("HELLO");
	res.writeHead(200, {'content-type': 'text/html'});
	res.write("HI");
	var requestURL = url.parse(req.url, true),
		path = requestURL.pathname,
		query = requestURL.query;
	console.log(path);
	if (path=="/hoster"){
		console.log("I'm a hoster!");
		stream = fs.createReadStream("music/" +  query.song+ "." + query.format).pipe(decoder);
		// stream.on("data", function(data){
		// 	encoder.write(data);
		// });
	}
	else if (path=="/joiner"){
		res.speaker = new Speaker();
		console.log("I'm a joiner!");
		stream.pipe(res.speaker);
		clients.push(res);
	}
	else{
		console.log("NOPE");
	}

	res.end();
}

// function sendData(data){
// 	clients.forEach(function(client){
// 		client.write(data);
// 		decoder.pipe(client.)
// 	});
// }
function playSong(songName){
	stream.pipe(decoder).pipe(speaker);
}