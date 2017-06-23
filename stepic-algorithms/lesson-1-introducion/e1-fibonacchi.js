// https://stepik.org/lesson/Числа-Фибоначчи-13228/step/6
process.stdin.setEncoding('utf8');
var chunk = '';

process.stdin.on('data', function(data) {
    chunk += data;
});

function calcFib(n){
    var arr = new Array(0, 1);
    if (n >= 2) {
        for (var i = 2; i <= n; i++) {
            arr[i] = arr[i - 1] + arr[i - 2];
        }
    }

    return arr[n];
}

process.stdin.on('end', () => {
   var n = parseInt(chunk, 10);

    var result = calcFib(n);

    process.stdout.write(String(result));
});
