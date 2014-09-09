var app = require('express')();
var server = require("http").Server(app);
var io = require('socket.io')(server);

server.listen(8080);

app.get('/:file?', function (req, res) {
  if (req.params.file === undefined) {
  	req.params.file = 'index.html';
  }
  res.sendfile(__dirname + '/' + req.params.file);
});

var i = 0;
io.sockets.on('connection', function (socket) {
  i++;
  // 自分以外に一斉に出される。
  socket.broadcast.emit('user connected', i);
  socket.emit('user connected', i);
  
  socket.emit('con', i);
  console.log(i + 'conneted');
});
