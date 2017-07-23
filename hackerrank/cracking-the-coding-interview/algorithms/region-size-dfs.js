// https://www.hackerrank.com/challenges/ctci-connected-cell-in-a-grid/problem

function createMatrix(rows, columns, initValue = 0) {
    return Array.from(
        {length: rows + 1},
        () => Array.from(
            {length: columns + 1},
            () => initValue
        )
    );
}

function calcRegionSizeOf(matrix, visited, row, col){
    const rowsCount = matrix.length - 1;
    const colsCount = matrix[0].length - 1;

    if(
        row < 0 || col < 0 ||
        row > rowsCount || col > colsCount ||
        matrix[row][col] === 0 ||
        visited[row][col]
    ) {
        return 0;
    }

    visited[row][col] = true
    let size = 1;

    for(let r = row - 1; r <= row + 1; r++){
        for(let c = col - 1; c <= col + 1; c++){
            size += calcRegionSizeOf(matrix, visited, r, c);
        }
    }

    return size;
}

function getMaxRegionSizeOf(matrix){
    const rowsCount = matrix.length - 1;
    const colsCount = matrix[0].length - 1;

    const visited = createMatrix(rowsCount, colsCount, false);

    let maxSize = -Infinity;
    for (let row = 0; row <= rowsCount; row++){
        for (let col = 0; col <= colsCount; col++){
            const size = calcRegionSizeOf(matrix, visited, row, col);
            maxSize = Math.max(maxSize, size);
        }
    }
    return maxSize;
}

const input1 = [
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 0],
    [1, 0, 0, 0]
];

console.assert(
    getMaxRegionSizeOf(input1) === 5
);


