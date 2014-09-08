var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// ビューエンジン(jade)の設定
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// ミドルウェアの設定
// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));        // ファビコンの表示
app.use(logger('dev'));                                     // リクエストをコンソールに表示
app.use(bodyParser.json());                                 // application/json を解析
app.use(bodyParser.urlencoded({ extended: false }));        // application/x-www-form-urlencoded を解析
app.use(cookieParser());                                    // cookie の利用
app.use(express.static(path.join(__dirname, 'public')));    // 静的なファイルの表示

// ルーティング
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
