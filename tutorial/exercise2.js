var cnt = 0
for (var i = 2; i < process.argv.length; i++) {
    cnt += Number(process.argv[i])
}
console.log(cnt)

