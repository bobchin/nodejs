var fs = require('fs'),
    path = require('path');

function filterExt(dirname, ext, callback){
  fs.readdir(dirname, function(err, files){
    if (err) {
      return callback(err);
    }
    // files.forEach(function(file){
    //   if (path.extname(file) == '.' + ext) {
    //     result.push(file);
    //   }
    // });
    var result = files.filter(function(file){
        return (path.extname(file) == '.' + ext);
    });
    callback(null, result);
  });
}

module.exports = filterExt;
