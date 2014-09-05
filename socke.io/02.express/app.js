// var app = require('express').createServer()
//   , io = require('socket.io').listen(app);
// io.set('log level', 2);
// app.listen(8080);
var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

io.set('log level', 2);
server.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
app.get('/jquery-1.7.2.min.js', function (req, res) {
  res.sendfile(__dirname + '/jquery-1.7.2.min.js');
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
