var fs = require('fs'),
    path = require('path');

var dirname = process.argv[2];
var ext = '.' + process.argv[3];

fs.readdir(dirname, function(err, files){
  // for (var i = 0; i < files.length; i++){
  //   if (files[i] == '.' || files[i] == '..'){
  //     continue;
  //   }
  //   if (path.extname(files[i]) == ext) {
  //     console.log(files[i]);
  //   }
  // }
  files.forEach(function(file){
    if (path.extname(file) == ext) {
      console.log(file);
    }
  });
});
