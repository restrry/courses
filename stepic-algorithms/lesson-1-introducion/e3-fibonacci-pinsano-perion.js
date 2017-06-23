// https://stepik.org/lesson/Числа-Фибоначчи-13228/step/8

/*
    More info:
    https://medium.com/competitive/huge-fibonacci-number-modulo-m-6b4926a5c836
    https://github.com/rowles/Pisano-Period/blob/master/PisanoPeriod.py
*/

process.stdin.setEncoding('utf8');
var chunks = '';

process.stdin.on('data', function(data) {
    chunks += data;
});

process.stdin.on('end', () => {
    const [n, m] = chunks.split(' ').map(Number);

    const result = getModeDivBy(n, m);

    process.stdout.write(String(result));
});


function getPisanoPeriod(m) {
    let a = 0,
        b = 1,
        c = a + b;

    for (var i = 0; i < m * m; i++) {
        c = (a + b) % m;
        a = b;
        b = c;
        if (a == 0 && b == 1) {
            return i + 1;
        }
    }
    
    throw new Error('No period length was calculated');
}

function getModeDivBy(n, m) {
    const remainder = n % getPisanoPeriod(m);

    let first = 0;
    let second = 1;

    let res = remainder;

    for (let i = 1; i < remainder; i++) {
        res = (first + second) % m;
        first = second;
        second = res;
    }

    return res % m;
}
