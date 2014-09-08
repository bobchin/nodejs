var http = require('http');
var querystring = require('querystring');
var crypto = require('crypto');

var htmlHeader = '<!DOCTYPE html>\
<html lang="ja">\
<head>\
<meta charset="uft-8">\
<title>ノード占い</title>\
<style>\
	.content {\
		width: 480px;\
		text-align: center;\
		border: 4px solid lightblue;\
		padding: 4px;\
		margin: 16px auto;\
	}\
	.main-form div {\
		margin-bottom: 4px;\
	}\
	.result {\
		display: block;\
		font-size: 200%;\
		color: red;\
		margin: 4px auto;\
		border: 1px solid;\
		width: 4em;\
	}\
</style>\
</head>\
<body>\
<div class="content">\
<h1>ノード占い</h1>\
';

var htmlMainForm = '<div class="main-form">\
<form method="post" action="/">\
	<div>\
		<lable>名前：<input type="text" name="name" size="20"></label>\
	</div>\
	<div>\
		生年月日\
		<lable><input type="text" name="year" size="5">年</label>\
		<lable><input type="text" name="month" size="3">月</label>\
		<lable><input type="text" name="day" size="3">日</label>\
	</div>\
	<div>\
		性別\
		<lable><input type="radio" name="sex" value="male" checked>男</label>\
		<lable><input type="radio" name="sex" value="female">女</label>\
	</div>\
	<input type="submit" value="占う">\
</form>\
</div>\
';

var htmlFooter = '</div>\
</body>\
</html>\
';

function escapeHtmlSpecialChar(html){
	if (html === undefined) {
		html = "";
	} else {
		html = html.replace(/&/g, '&amp;');
		html = html.replace(/</g, '&lt;');
		html = html.replace(/>/g, '&gt;');
	}
	return html;
}

var server = http.createServer(onRequest);

function onRequest(req, res) {

	// リクエストパスが"/"以外は404
	if (req.url != '/') {
		res.writeHead(404, {'Contet-Type': 'text/plain; charset=utf-8'});
		res.end('Error 404: Not Found');
		return;
	}

	// POST以外の場合入力フォームを表示
	if (req.method != 'POST') {
		res.writeHead(200, {'Contet-Type': 'text/html; charset=utf-8'})
		res.write(htmlHeader);
		res.write(htmlMainForm);
		res.write(htmlFooter);
		res.end();
		return;
	}

	// POSTの場合は占いを実行
	if (req.method == 'POST') {
		req.data = '';
		req.on('data', function(chunk){
			req.data += chunk;
		});
		req.on('end', sendResponse);
		return; 
	}

	function sendResponse() {
		var query = querystring.parse(req.data);
		var seed = query.name + query.year + query.month + query.day + query.sex;
		var hash = crypto.createHash('md5');
		hash.update(seed);
		var hashValue = hash.digest('hex');

		var fourtuneKey = Number('0x' + hashValue.slice(0, 2));
		
		var result = '';
		if (fourtuneKey < 10) {
			result = '大凶';
		} else if (fourtuneKey < 50) {
			result = '凶';
		} else if (fourtuneKey < 100) {
			result = '末吉';
		} else if (fourtuneKey < 150) {
			result = '吉';
		} else if (fourtuneKey < 245) {
			result = '中吉';
		} else {
			result = '大吉';
		}

		var resultHtml = '<div><p>'
			+ escapeHtmlSpecialChar(query.year) + '年'
			+ escapeHtmlSpecialChar(query.month) + '月'
			+ escapeHtmlSpecialChar(query.day) + '日生まれの'
			+ escapeHtmlSpecialChar(query.name) + 'さん（'
			+ ((query.sex == 'male')? '男性': '女性')
			+ '）の運勢は......'
			+ '<span class="result">' + result + '</span>'
			+ 'です。</p></div>'
			+ '<a href="/">トップへもどる</a>'

		res.writeHead(200, {'Contet-Type': 'text/html; charset=utf-8'})
		res.write(htmlHeader);
		res.write(resultHtml);
		res.write(htmlFooter);
		res.end();
	}



}

var PORT = 8080;
var ADDRESS = 'localhost';
server.listen(PORT, ADDRESS);
console.log('Server running at http://' + ADDRESS + ':' + PORT + '/');

