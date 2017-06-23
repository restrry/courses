// https://stepik.org/lesson/Числа-Фибоначчи-13228/step/7

process.stdin.setEncoding('utf8');q
var chunk = '';

process.stdin.on('data', function(data) {
    chunk += data;
});

function calcLastNumberForFib(n){
    var arr = new Array(0, 1);
    if (n >= 2) {
        for (var i = 2; i <= n; i++) {
            arr[i] = (arr[i - 1] + arr[i - 2]) % 10;
        }
    }

    return arr[n];
}

process.stdin.on('end', () => {
   var n = parseInt(chunk, 10);

    var result = calcLastNumberForFib(n);

    process.stdout.write(String(result));
});
