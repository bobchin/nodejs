var fs = require('fs');

var filename = process.argv[2];
var buf = fs.readFileSync(filename);
var length = buf.toString().split('\n').length;

console.log(length - 1);
