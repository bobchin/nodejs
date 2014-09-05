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
io.set('log level', 2);

// ファイルの返信
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
app.get('/jquery-1.7.2.min.js', function (req, res) {
  res.sendfile(__dirname + '/jquery-1.7.2.min.js');
});

// イベント
io.sockets.on('connection', function (socket) {
  socket.on('set nickname', function (name) {
    console.log(name);
    socket.set('nickname', name, function () {
      socket.emit('ready');
    });
  });

  socket.on('msg', function () {
    socket.get('nickname', function (err, name) {
      console.log('Chat message by ', name);
      socket.emit("resmsg", 'Chat message by '+ name);
    });
  });
});
