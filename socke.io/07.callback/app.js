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

io.sockets.on('connection', function (socket) {
  socket.on('ferret', function (name, fn) {
  	// コールバックはクライアント側で実行
    fn(name + ' was successfully sent');

    // 'msg push' を実行
    socket.emit('msg push', name, function(data){
      console.log(data);
    });
  });
});
