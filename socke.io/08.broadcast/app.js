/*
var app = require('express').createServer()
  , io = require('socket.io').listen(app);

io.set('log level', 2);
app.listen(80);
*/
var app = require('express')(),
server = require("http").createServer(app),
io = require('socket.io').listen(server);

io.set('log level', 2);
server.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
app.get('/jquery-1.7.2.min.js', function (req, res) {
  res.sendfile(__dirname + '/jquery-1.7.2.min.js');
});

var i = 0;
io.sockets.on('connection', function (socket) {
  i++;
  socket.broadcast.emit('user connected', i);
  socket.emit('con', i);
  console.log(i + 'conneted');
});
