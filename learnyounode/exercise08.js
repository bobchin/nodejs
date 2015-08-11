var http = require('http');
var bl = require('bl');

http.get(process.argv[2], function(res){
  var data = '';
  // res.setEncoding('utf8');
  // res.on('data', function(str){
  //   data += str;
  // });
  // res.on('end', function(){
  //   console.log(data.length);
  //   console.log(data);
  // })
  // res.on('err', console.error);
  res.pipe(bl(function(err, str){
    if (err) {
      return console.error(err);
    }

    var result = str.toString();
    console.log(result.length);
    console.log(result);
  }));
});
