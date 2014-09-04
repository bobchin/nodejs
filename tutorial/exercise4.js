var fs = require("fs")
var filename = process.argx[2]

fs.readFile(filename, function(err, data){
    var count = data.split("\n").length - 1
    console.log(count)
})
