// https://www.hiredintech.com/classrooms/algorithm-design/lesson/12/task/15

function createMatrix(rows, columns) {
    return Array.from(
        {length: rows + 1},
        () => Array.from(
            {length: columns + 1},
            () => 0
        )
    );
}

function countAllPathsFor(inputMatrix){
    const rows = inputMatrix.length - 1;
    const columns = inputMatrix[0].length - 1;

    const matrix = createMatrix(rows, columns);

    for (let row = 0; row <= rows; row++) {
        if(inputMatrix[row][0] === 0){
            break;
        };
        matrix[row][0] = 1;
    }

    for (let column = 0; column <= columns; column++) {
        if(inputMatrix[0][column] === 0){
            break;
        };
        matrix[0][column] = 1;
    }

    for(let row = 1; row <= rows; row++){
        for(let column = 1; column <= columns; column++){
            if(inputMatrix[row][column] === 1){
                matrix[row][column] = matrix[row - 1][column] + matrix[row][column - 1];
            }
        }
    }

    return matrix[rows][columns];
}



/* 
Given matrix
1 0 1
1 1 1
0 1 1

count all possible paths to rich right bottom corner from the top left corner
1 = can be used
0 = can't be used
we can go only left and bottom
*/

const input1 = [
    [1, 0, 1],
    [1, 1, 1],
    [0, 1, 1]
];

const output1 = countAllPathsFor(input1);
console.assert(
    countAllPathsFor(input1) === 2
);

const input2 = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1]
];

console.assert(
    countAllPathsFor(input2) === 2
);

const input3 = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1]
];

console.assert(
    countAllPathsFor(input3) === 6
);
