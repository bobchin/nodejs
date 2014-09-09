var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(8080);

// HTTPサーバのrequestイベント
function handler (req, res) {
  // index.html or jquery-1.7.2.min.js を返す
  var filename = __dirname + '/index.html';
  if (req.url == '/jquery-1.7.2.min.js') {
    filename = __dirname + req.url;
  }

  fs.readFile(filename,
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
      res.writeHead(200);
      res.end(data);
    }
  );
}

// ソケットが接続された時のイベント
io.on('connection', function (socket) {
  // クライアントのnewsイベントを実行
  socket.emit('news', { hello: 'world' });

  socket.on('my other event', function (data) {
    console.log(data);
  });
});
