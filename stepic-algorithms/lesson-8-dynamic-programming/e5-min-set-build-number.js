// https://stepik.org/lesson/Обзор-13262/step/5

process.stdin.setEncoding('utf8');
var chunks = '';

process.stdin.on('data', function(data) {
  chunks += data;
});

process.stdin.on('end', () => {
    const number = Number(chunks);
    const { cost, path } = calcMinOperationSetForNumber(number);
    const output = [cost, path.join(' ')].join('\n');

    process.stdout.write(output);
});

function buildFullPath(number, path){
    let i = number;
    const result = [i];
    while(i > 1){
        result.push(path[i]);
        i = path[i];
    }
    return result;
}

function calcMinOperationSetForNumber(number){
    const cost = Array(number + 1);
    const path = Array(number + 1);
    cost[0] = -1;
    cost[1] = 0;
    let i = 1;
    while(i <= number){
        var i3 = i % 3 === 0 ? cost[i/3] : Infinity;
        var i2 = i % 2 === 0 ? cost[i/2] : Infinity;
        var i1 = cost[i-1];
        var min = Math.min(i3, i2 ,i1);

        if (min === i3) {
            path[i] = i/3;
        } else if (min === i2) {
            path[i] = i/2;
        } else {
            path[i] = i - 1;
        }

        cost[i] = min + 1;
        i++;
    }

    const fullPath = buildFullPath(number, path).reverse();

    return { cost: cost[number], path: fullPath };
}

// function last (arr) {
//     return arr[arr.length - 1];
// }

// function calcMinOperationSetForNumber(number){
//     const cost = Array(number).fill(0);

//     for(let i = 1; i <= arr.length - 1; i++){
//         cost[i] = Math.min(
//             i % 3 === 0 ? cost[i%3] : Infinity,
//             i % 2 === 0 ? cost[i%2] : Infinity,
//             cost[i-1]
//         )
//     }

//     return last(W);
// }
