/*
処理の流れ
1. ルーム画面を表示
2. CL:io.connect() 実行によりソケット接続
3. SV:onConnection()
4. CL:connected
5. SV:check credential
6. CL:credential ok
7. SV:request log
8. CL:request log
9. CL:update log

5: CL:update members
6: CL:push message
*/




// ルームID毎にソケットを管理する
// socketOf[roomId] = [socket1, socket2, ...]
var socketOf = {};

// roomId に属するクライアントすべてにイベントを送信する
function emitToRoom(roomId, event, data, fn){
	if (socketOf[roomId	] === undefined) {
		return;
	}
	var sockets = socketOf[roomId];
	Object.keys(sockets).forEach(function(key){
		sockets[key].emit(event, data, fn);
	});
}

function _formatDate(date){
	var mm = date.getMonth();
	var dd = date.getDate();
	var HH = zeroPad(date.getHours());
	var MM = zeroPad(date.getMinutes());
	return format('{0}/{1} {2}:{3}', mm, dd, HH, MM);
}

function zeroPad(val, keta){
	if (keta === undefined) {
		keta = 2;
	}
	return ('0' + val).slice(-1 * keta);
}

function format(fmt, a){
	var rep_fn = undefined;
    
    if (typeof a == "object") {
        rep_fn = function(m, k) { return a[ k ]; }
    } else {
        var args = arguments;
        rep_fn = function(m, k) { return args[ parseInt(k) + 1 ]; }
    }
    
    return fmt.replace( /\{(\w+)\}/g, rep_fn);
}


// 外出し //////////////////////////////////////////////////////////////
var crypto = require('crypto');

// ソケットが接続されたときに実行する
exports.onConnection = function(socket){

	// ソケットが接続されたら認証する
	socket.emit('connected', {});

	// 認証情報を確認する
	socket.on('hash password', function(password, fn){
		var utils = require('../utils');
		fn(utils.hash(password));
	});

	// 認証する
	// client: minichat情報
	socket.on('check credential', function(client){

		// ルーム作成時
		if (client.mode == 'create'){
			// 既にルームが作成されていたらエラー
			if (socketOf[client.roomId] !== undefined) {
				socket.emit('credential ng', {msg: '同名のルームが既に存在します'});
				return;
			}
			// ルームを作成
			socketOf[client.roomId] = {};	

		// 既設ルームに入るとき
		} else if (client.mode == 'enter') {
			// ルームが存在しないとエラー
			if (socketOf[client.roomId] === undefined) {
				socket.emit('credential ng', {msg: 'ルーム名またはパスワードが不正です'});
				return;
			}
			// 同じユーザ名がいたらエラー
			if (socketOf[client.roomId][client.userName] !== undefined) {
				socket.emit('credential ng', {msg: 'その名前は既に使用されています'});
				return;
			}
		}

		// ソケットにクライアント情報をセットする
		socket.set('client', client, function(){
			socketOf[client.roomId][client.userName] = socket;
			if (client.userName) {
				console.log('user %s@%s connected', client.userName, client.roomId);
			}
		});

		// 認証成功
		socket.emit('credential ok', {});

		// 既存クライアントにメンバーの変更を通知
		emitToRoom(client.roomId, 'update members', Object.keys(socketOf[client.roomId]));

		var shasum = crypto.createHash('sha1');
		var message = {
			from: 'システムメッセージ',
			body: client.userName + 'さんが入室しました',
			roomId: client.roomId
		};
		message.date = _formatDate(new Date());
		shasum.update('-' + message.roomId);
		message.id = (new Date()).getTime() + '-' + shasum.digest('hex');
		emitToRoom(message.roomId, 'push message', message);
	});

	// ソケットが切断されたらソケット一覧から削除する
	socket.on('disconnect', function(){
		socket.get('client', function(err, client){
			if (err || !client) {
				return;
			}

			var sockets = socketOf[client.roomId];
			if (sockets !== undefined) {
				delete sockets[client.userName];
			}
			console.log('user %s@%s disconnected', client.userName, client.roomId);

			var members = Object.keys(sockets);
			if (members.length == 0) {
				// メンバがいないのでルームを削除
				delete socketOf[client.roomId];
			} else {
				emitToRoom(client.roomId, 'update members', members);
				var shasum = crypto.createHash('sha1');
				var message = {
					from: 'システムメッセージ',
					body: client.userName + 'さんが退室しました',
					roomId: client.roomId
				};
				message.date = _formatDate(new Date());
				shasum.update('-' + message.roomId);
				message.id = (new Date()).getTime() + '-' + shasum.digest('hex');
				emitToRoom(message.roomId, 'push message', message);
			}
		});
	});

	// クライアントからのメッセージ送信
	socket.on('say', function(message, fn){
		console.log('receive message');

		var shasum = crypto.createHash('sha1');
		message.date = _formatDate(new Date());
		shasum.update(message.userName + '-' + message.roomId);
		message.id = (new Date()).getTime() + '-' + shasum.digest('hex');
		emitToRoom(message.roomId, 'push message', message);

		// クライアントのコールバックを実行
		fn();
	});

	// クライアントからログを要求
	socket.on('request log', function(data){
		socket.get('client', function(err, client){
			if (err || !client) {
				return;
			}

			emitToRoom(client.roomId, 'req log', {}, function(log){
				socket.emit('update log', log);
			});
			//emitToRoom(client.roomId, 'update log', {});
		});
	});
};





