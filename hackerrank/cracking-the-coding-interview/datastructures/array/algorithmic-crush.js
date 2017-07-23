// https://www.hackerrank.com/challenges/crush

function performOperations(arr, operations){
    for (var o = 0; o < operations.length; o++) {
        const [start, end, value] = operations[o];
        for(let i = start; i <= end; i++){
            arr[i] += value;
        }
    };
}

function calcMax(size, operations){
    // in definiton array origin = 1
    const arr = Array.from({ length: size + 1 }, () => 0);

    performOperations(arr, operations);
    return Math.max(...arr);
}

function performOperations2(cache, operations){
    for (var o = 0; o < operations.length; o++) {
        var [start, end, value] = operations[o];
        for(let i = start; i <= end; i++){
            cache[i] += value;
        }
    };
}

function calcMax2(n, operations){
    const cache = Object.create(null);
    var size = n;
    while(size){
        cache[size] = 0;
        size--;
    }

    performOperations2(cache, operations);

    return findMaxKey(cache);
}

function findMaxKey(obj){
    var keys = Object.keys(obj);
    var max = 0;
    for(var k = 0; k < keys.length; k++){
        max = Math.max(max, obj[keys[k]]);
    }
    return max;
}

const input1 = [
    [1, 2, 100],
    [2, 5, 100],
    [3, 4, 100]
];
const operationNumber = 5;
console.assert(
    calcMax(operationNumber, input1) === 200
);

console.assert(
    calcMax2(operationNumber, input1) === 200
);
