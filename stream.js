var	express = require('express'),
	routes = require('./routes'),
	path = require('path'),
	app = express(),
	http = require('http'),
	server = http.createServer(app),
	url = require('url'),
	fs = require("fs"),
	// stream,
	lame = require("lame"),
	Speaker = require("speaker"),
	decoder = new lame.Decoder(),
	encoder = new lame.Encoder({channels: 2, bitDepth:16, sampleRate:44100});

// all environments
app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/hoster', routes.host);
app.get('/joiner', routes.join);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// server.on('request', handleRequest);
// server.listen(8000);

var clients = [],
	stream;

// encoder.on("data", function(data){
// 	sendData(data);
// });

function changeHoster(req, res){
	res.writeHead(200, {'content-type': 'text/html'});
	var query = url.parse(req.url, true).query;
	stream = fs.createReadStream("music/" +  query.song+ "." + query.format).pipe(decoder);
	res.end();
}

function addJoiner(req, res){
	res.writeHead(200, {'content-type': 'text/html'});
	res.speaker = new Speaker();
	stream.pipe(res.speaker);
	clients.push(res);	
	res.end();
}

function handleRequest(req, res){
	var requestURL = url.parse(req.url, true),
		path = requestURL.pathname,
		query = requestURL.query;
	if (path=="/hoster"){
		console.log("I'm a hoster!");
		stream = fs.createReadStream("music/" +  query.song+ "." + query.format).pipe(decoder);
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