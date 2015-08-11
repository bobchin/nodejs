var filterExt = require('./learnyounode6_module.js');
var dirname = process.argv[2];
var ext = process.argv[3];

filterExt(dirname, ext, function(err, data){
  if (err) {
    return console.error('Error Occurred', err);
  }
  data.forEach(function(file){
    console.log(file);
  });
});
