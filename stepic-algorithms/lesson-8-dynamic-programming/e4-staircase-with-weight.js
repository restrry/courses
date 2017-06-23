// https://stepik.org/lesson/Обзор-13262/step/4

process.stdin.setEncoding('utf8');
var chunks = '';

process.stdin.on('data', function(data) {
  chunks += data;
});

process.stdin.on('end', () => {
    const [, input] = chunks.split('\n');
    const numbers = input.split(' ').map(i => Number(i));
    const output = calcMaxForStaircase(numbers);

    process.stdout.write(String(output));
});


function last (arr) {
    return arr[arr.length - 1];
}

function calcMaxForStaircase(arr){
    const W = Array(arr.length - 1).fill(0);

    for(let i = 0; i <= arr.length - 1; i++){
        W[i] = Math.max(
            (W[i-1]||0) + arr[i],
            (W[i-2]||0) + arr[i]
        );
    }

    return last(W);
}
