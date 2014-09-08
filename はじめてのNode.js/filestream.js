var fs = require('fs');

var stream = fs.createReadStream('fortune.js', {encoding: 'utf-8'});

stream.on('readable', function(){
	console.log('readable!!!');
});

stream.on('data', function(chunk){
	console.log('data!!!');
	console.log('length: %d', chunk.length);
});

stream.on('end', function(){
	console.log('end!!!');
});

stream.on('close', function(){
	console.log('close!!!');
});

stream.on('error', function(err){
	console.log('error!!!');
});







