var http = require('http'),
    url = require('url');

var port = Number(process.argv[2]);

var server = http.createServer(function(req, res){

  var results = {};
  var urls = url.parse(req.url, true);

  var d = new Date(urls.query.iso);
  if (urls.pathname == '/api/parsetime') {
    results['hour'] = d.getHours();
    results['minute'] = d.getMinutes();
    results['second'] = d.getSeconds();
  } else if (urls.pathname == '/api/unixtime') {
    results['unixtime'] = d.getTime();
  }

  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(results));

}).listen(port);
