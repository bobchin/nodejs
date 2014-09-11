var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

var i = 0;
io.on('connection', function(socket){
	io.emit('chat message', ++i + '番目のユーザが接続しました');

	socket.on('disconnect', function(){
		io.emit('chat message', 'ユーザが切断しました。残り' + --i + '人です');
	});

	socket.on('chat message', function(msg){
		socket.broadcast.emit('chat message', msg);
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});


