/*
チャットルームページを開くときに
クライアントから読み込まれる
*/

(function(){
	var socket;
	var messageLogs = {};

	$(document).ready(function(){

		socket = io.connect();

		// イベント /////////////////////////////////////////////////////

		// サーバへ接続完了したら認証チェックする
		socket.on('connected', function(data){
			socket.emit('check credential', minichat);
		});

		// 認証に成功したらチャットログを送信する
		socket.on('credential ok', function(data){
			socket.emit('request log', {});
		});

		// 認証に失敗したら再認証画面を表示する
		socket.on('credential ng', function(data){
			// 再認証フォームを表示する
			$('#credential-dialog-header').text(data.msg);
			$('#new-room').val(minichat.roomName);
			$('#new-name').val(minichat.userName);
			$('#credentialDialog').modal('show');
		});

		// チャットログの送信
		socket.on('req log', function(data, callback){
			console.log('request log');
			console.log(messageLogs);
			callback(messageLogs);
		});

		// チャットログの更新
		socket.on('update log', function(log){
			console.log('update log');
			console.log(messageLogs);
			console.log(log);
			Object.keys(log).forEach(function(key){
				messageLogs[key] = log[key];
			});
			console.log(messageLogs);
			updateMessage();
		});

		// メンバー一覧を更新する
		socket.on('update members', function(member){
			$('members').empty();
			for (var i = 0; i < members.length; i++) {
				$('members').append('<li>' + members[i] + '</li>');
			}
		});

		// メッセージを追加
		socket.on('push message', function(message){
			messageLogs[message.id] = message;
			prependMessage(message);
		});


		// クライアントイベント ///////////////////////////////////////////////

		// メッセージ送信（ボタンクリック）
		$('#post-message').on('click', function(){
			var message = {
				from: minichat.userName,
				body: $('#message').val(),
				roomId: minichat.roomId
			};

			socket.emit('say', message, function(){
				$('#message').val('');
			});
		});

		// 再認証フォームのsubmit処理
		$('#credential-dialog-form').on('submit', function(){
			// 再認証フォームを隠す
			$('#credentialDialog').modal('hide');

			socket.emit('hash password', $('#new-password').val(), function(hashedPassword){
				minichat.roomName = $('#new-room').val();
				minichat.userName = $('#new-name').val();
				minichat.password = hashedPassword;
				minichat.roomId = minichat.roomName + minichat.password;
				socket.emit('check credential', minichat);
			});
			return false;
		});

		// method ///////////////////////////////////////////////////

		// メッセージ毎にHTMLを付ける
		function prependMessage(message){
			var html = '<div class="message" id="' + message.id + '">'
				+ '<p class="postdata pull-right">' + message.date + '</p>'
				+ '<p class="author">' + message.from + '</p>'
				+ '<p class="commit">' + message.body + '</p>'
				+ '</div>';
			$('#messages').prepend(html);
		}

		// メッセージ一覧をアップデートする
		// メッセージは最新が上になる
		function updateMessage() {
			$('#messages').empty();
			var keys = Object.keys(messageLogs);
			keys.sort();
			keys.forEach(function(key){
				prependMessage(messageLogs[key]);
			});
		}
	});
}).apply(this);




