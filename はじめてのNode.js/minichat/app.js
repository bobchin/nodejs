var express = require('express');
var http = require('http');
var path = require('path');
var routes = require('./routes');
var chatsockets = require('./socket/chat.js');

var app = express();

app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');

	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

app.get('/', routes.index);
app.post('/room', routes.room);

var server = http.createServer(app);
var io = require('socket.io').listen(server, {log: false});

server.listen(app.get('port'), function(){
	console.log('Express server listening on port' + app.get('port'));
});

// ソケットが接続したら実行
io.sockets.on('connection', chatsockets.onConnection);
