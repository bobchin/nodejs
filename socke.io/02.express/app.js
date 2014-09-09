var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);

app.get('/:file?', function (req, res) {
  if (req.params.file === undefined) {
  	req.params.file = 'index.html';
  }
  res.sendfile(__dirname + '/' + req.params.file);
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
