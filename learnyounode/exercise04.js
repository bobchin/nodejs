var fs = require('fs');

var filename = process.argv[2];

// fs.readFile(filename, function(err, data){
//   console.log(data.toString().split('\n').length - 1);
// });

fs.readFile(filename, 'utf8', function(err, data){
  console.log(data.split('\n').length - 1);
});
