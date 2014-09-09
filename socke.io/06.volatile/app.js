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

io.sockets.on('connection', function (socket) {
  var i = 0;
  var roop = setInterval(function() {
    socket.volatile.emit('volatile msg', ++i);
  }, 100);

  socket.on('stop', function(){
    clearInterval(roop);
  });
});
