var app = require("express")();
var server = require("http").Server(app);
var io = require("socket.io")(server);

server.listen(8080);

app.get('/:file?', function (req, res) {
  if (req.params.file === undefined) {
    req.params.file = 'index.html';
  }
  res.sendfile(__dirname + '/' + req.params.file);
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

