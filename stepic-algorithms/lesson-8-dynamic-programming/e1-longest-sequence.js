// https://stepik.org/lesson/Наибольшая-возрастающая-подпоследовательность-13257/step/5

process.stdin.setEncoding('utf8');
var chunks = '';

process.stdin.on('data', function(data) {
  chunks += data;
});

process.stdin.on('end', () => {
    // input n, [...]
    const [n, input] = chunks
        .split('\n');

    const toNumber = i => Number(i);
    const numbers = input.split(' ').map(toNumber);

    const output = calcDivSequence(numbers);

    process.stdout.write(String(output));
});

function calcDivSequence(arr){
    const D = new Array(arr.length);
    for(let i = 0; i < arr.length; i++){
        D[i] = 1;
        for(let j = 0; j < i; j++){
            if(arr[i] === 0 || arr[j] === 0) continue;
            if(arr[i] % arr[j] === 0 && (D[j] + 1 > D[i])){
                D[i] = D[j] + 1;
            }
        }
    }
    return Math.max(...D);
}
