/*
ルーティングを決定する
（コントローラ的な役割をする）
*/

// トップページを表示する
exports.index = function(req, res){
	res.render('index', {title: 'minichat'});
};

// チャットルームを表示する
exports.room = function(req, res){
	var roomName = req.body.roomName || '';
	var yourName = req.body.yourName || '';
	var password = req.body.password || '';
	var mode     = req.body.mode;

	// モードが指定されていなければエラー
	if (mode === undefined) {
		res.send(500);
		return;
	}

	var utils = require('../utils');
	var params = {
		title: 'チャットルーム：' + roomName,
		room: {
			name: roomName,
			password: utils.hash(password)
		},
		user: {name: yourName},
		mode: mode
	};
	res.render('room', params);
}

