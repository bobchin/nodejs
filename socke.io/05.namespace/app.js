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

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
app.get('/jquery-1.7.2.min.js', function (req, res) {
  res.sendfile(__dirname + '/jquery-1.7.2.min.js');
});


var chat = io
  .of('/chat') // chat のイベントになる
  .on('connection', function (socket) {
    socket.emit('a message', {
      msg: "all socket!"
    });
    chat.emit('a message', {
      msg: "chat socket!"
    });
  });

var news = io
  .of('/news') // news のイベントになる
  .on('connection', function (socket) {
    socket.emit('item', { 
      news: 'item'
    });
  });

