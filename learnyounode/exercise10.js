var net = require('net');

var server = net.createServer(function(socket){
  var d = new Date();
  socket.end(
    d.getFullYear()       + '-' +
    pad(d.getMonth() + 1) + '-' +
    pad(d.getDate())      + ' ' +
    pad(d.getHours())     + ':' +
    pad(d.getMinutes()));
});

var port = Number(process.argv[2]);
server.listen(port);

function pad(val) {
  return ('00' + val).slice(-1 * 2);
}
