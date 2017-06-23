// https://stepik.org/lesson/Расстояние-редактирования-13258/step/1

process.stdin.setEncoding('utf8');
var chunks = '';

process.stdin.on('data', function(data) {
  chunks += data;
});

process.stdin.on('end', () => {
    const [str1, str2] = chunks.split('\n');

    const output = calcLevenshteinDistanceFor(str1, str2);

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

function calcLevenshteinDistanceFor(str1, str2){
    const n = str1.length;
    const m = str2.length;

    if (n === 0) return m;
    if (m === 0) return n;

    const matrix = createMatrix(n + 1, m + 1);

    for (let i = 0; i <= n; i++) {
        matrix[i][0] = i;
    }

    for (let j = 0; j <= m; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= n; i++) {
        const ch1 = str1[i-1];
        for (let j = 1; j <= m; j++) {
            const ch2 = str2[j-1];
            const cost = ch1 === ch2 ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i-1][j] + 1,
                matrix[i-1][j-1] + cost,
                matrix[i][j-1] + 1
            );
        }
    }

    return matrix[n][m];
}
