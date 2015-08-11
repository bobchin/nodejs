var http = require('http'),
    map = require('through2-map');

var port = Number(process.argv[2]);

http.createServer(function(req, res){
  if (req.method != 'POST') {
    return res.end('Send me a POST!');
  }

  req.pipe(map(function(chunk){
    return chunk.toString().toUpperCase();
  })).pipe(res);
}).listen(port);
