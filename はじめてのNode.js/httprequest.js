var http = require('http');

var server = http.createServer(function(req, res){

	res.writeHead(200);

	if (req.url == '/') {
		res.write('root!');
	} else if (req.url == '/foo') {
		res.write('foo!');
	} else {
		res.write('other');
	}
	res.write('\n');

	if (req.method == 'POST') {
		res.write('POST');
	} else if (req.method == 'GET') {
		res.write('GET');
	} else {
		res.write('other');
	}
	res.write('\n');
	res.write('\n');

	res.write('url:' + req.url + '\n');

	var url = require('url');
	var urlinfo = url.parse(req.url, true);
	Object.keys(urlinfo).forEach(function(key){
		res.write(key + ': ' + urlinfo[key] + '\n');
	});	

	res.end();
});

server.listen(8080);


