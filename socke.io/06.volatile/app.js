/*
var app = require('express').createServer()
  , io = require('socket.io').listen(app);

io.set('log level', 2);
app.listen(8080);
*/
var app = require("express")(),
server = require("http").createServer(app),
io = require("socket.io").listen(server);

server.listen(8080);
io.set("log level", 2);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
app.get('/jquery-1.7.2.min.js', function (req, res) {
  res.sendfile(__dirname + '/jquery-1.7.2.min.js');
});

io.sockets.on('connection', function (socket) {
  var i = 0;
  var roop = setInterval(function() {
    socket.volatile.emit('volatile msg', ++i);
  }, 1000);

  socket.on('stop', function(){
    clearInterval(roop);
  });
});
