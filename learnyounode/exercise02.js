if (process.argv.length < 3) {
  process.exit(1);
}

var result = 0;
for (var i = 2; i < process.argv.length; i++) {
  result += Number(process.argv[i]);
}

console.log(result);
