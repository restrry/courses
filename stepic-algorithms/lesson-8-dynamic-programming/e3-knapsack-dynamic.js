// https://stepik.org/lesson/Рюкзак-13259/step/5

process.stdin.setEncoding('utf8');
var chunks = '';

process.stdin.on('data', function(data) {
  chunks += data;
});

process.stdin.on('end', () => {
    const [str1, str2] = chunks.split('\n');
    const [total] = str1.split(/\s/);
    const items = str2.split(/\s/).map(i => Number(i));
    const output = calcKnapsackWithoutRepeating(total, items);

    process.stdout.write(String(output));
});

function createMatrix(x, y) {
    return Array.from(
        {length: x},
        () => Array.from(
            {length: y},
            () => 0
        )
    );
}

function calcKnapsackWithoutRepeating(total, items){
    const n = total;
    const m = items.length;
    const matrix = createMatrix(n + 1, m + 1);

    for(let i = 1; i <= m; i++){
        for(let t = 1; t <= n; t++){
            matrix[t][i] = matrix[t][i - 1];

            const item = items[i-1];

            if(item <= t){
                matrix[t][i] = Math.max(
                    matrix[t][i], // left previous (look above)
                    matrix[t-item][i - 1] + item // or get current
                );
            }
        }
    }

    return matrix[n][m];
}

// function calcKnapsackWithRepeating(total, items){
//     const tempTotal = new Array(total).fill(0);
//     for(let t = 0; t < tempTotal.length; t++){
//         for(let i = 0; i < items.length; i++){
//             const item = items[i];
//             if(item.weight <= t){
//                 tempTotal[t] = Math.max(tempTotal[t], tempTotal[t-item.weight] + item.cost);
//             }
//         }
//     }

//     return tempTotal[tempTotal.length - 1];
// }
