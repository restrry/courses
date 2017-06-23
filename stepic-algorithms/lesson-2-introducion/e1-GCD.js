// https://stepik.org/lesson/Наибольший-общий-делитель-13229/step/5

process.stdin.setEncoding('utf8');
var chunks = '';

process.stdin.on('data', function(data) {
    chunks += data;
});

process.stdin.on('end', () => {
    const [n, m] = chunks.split(' ').map(Number);

    const result = calcGCD(n, m);

    process.stdout.write(String(result));
});

function calcGCD(a, b){
    if (a === 0) return b;
    if (b === 0) return a;

    if(a > b){
        return calcGCD(a % b, b);
    } else {
        return calcGCD(a, b % a);
    }
}

