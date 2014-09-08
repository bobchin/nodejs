var http = require("http");

/**
 * httpServer クラスの主なイベント
 *
 * - request: function(request, response)
 * - connection: function(socket)
 * - close: function()
 * - checkContinue: function(request, response)
 * - connect: function(request, socket, head)
 * - upgrade: function(request, socket,head)
 * - clientError: function(exception)
 */
var server = http.createServer(function(request, response){

	// ステータスコード200でHTTPレスポンスヘッダを出力
	response.writeHead(200);

	// リクエストされたURL・HTTPメソッドを出力
	response.write('URL: ' + request.url + '\n');
	response.write('Method: ' + request.method + '\n');

	// HTTPヘッダを出力
	Object.keys(request.headers).forEach(function(key){
		response.write(key + ': ' + request.headers[key] + '\n');
	});

	response.end();
});
server.listen(8080, '127.0.0.1');
