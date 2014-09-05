var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

io.set('log level', 2);
app.listen(8080);

function handler (req, res) {
  var filename = __dirname + '/index.html';
  if (req.url == '/jquery-1.7.2.min.js') {
    filename = __dirname + req.url;
  }

  fs.readFile(filename,
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
      res.writeHead(200);
      res.end(data);
    }
  );
}

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
