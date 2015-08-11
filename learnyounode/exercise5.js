var fs = require("fs")
var path = require("path")

var dirname = process.argv[2]
var ext = process.argv[3]

fs.readdir(dirname, function(err, files){
    files.forEach(function(value, index){
        if (path.extname(value) === '.' + ext) {
            console.log(value)
        }
    })
})
