
/*
 * GET home page.
 */

var url = require('url');

exports.index = function(req, res){
  res.render('index', { title: 'Distributed Disco' });
};

exports.host = function(req, res){
	var query = url.parse(req.url, true).query;
	console.log(query.song);
	res.render('hoster', { title: 'Distributed Disco: Host' });
};

exports.join = function(req, res){
	var query = url.parse(req.url, true).query;
	res.render('joiner', { title: 'Distributed Disco: Join' });
};