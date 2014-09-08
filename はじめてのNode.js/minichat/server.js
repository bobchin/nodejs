var fs = require('fs');
var http = require('http');

var server = http.createServer();
var io = require('socket.io').listen(server);

// 2.リクエストがあったらclient.htmlを返す
server.on('request', function(req, res){
	fs.readFile('client.html', function(err, data){
		if (err) {
			res.writeHead(500);
			return res.end('Error loading client.html');
		}
		res.writeHead(200, {
			'Content-type': 'text/html; charset=utf-8'
		});
		res.end(data);
	});
});
// 1.HTTPサーバ起動
server.listen(8080);

// 3.クライアントからソケット接続されたら"greeting"イベント実行
io.sockets.on('connection', function(socket){
	socket.emit('greeting', {message: 'hello, '}, function(data){
		console.log('result: ' + data);
	});
});

/*
1. HTTPサーバ起動
2. クライアントからリクエストがあれば、client.htmlを返す
3. クライアント側でjQueryによりロード後にソケット接続開始
4. "connection"イベント開始(on Server)
5. "greeting"イベント開始(on Client)
6. クライアント側で入力メッセージ
7. 入力内容がコールバックに渡されサーバ側でコンソール表示
*/

