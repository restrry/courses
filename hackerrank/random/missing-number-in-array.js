const sum = arr => arr.reduce((s, i) => s + i, 0);

function missing (arr) {
    if(!arr.length) return;

    const arrSum = sum(arr);
    const max = Math.max(...arr);
    const arithmeticProgressionSum = (max * (max + 1)) / 2;
    const diff = arithmeticProgressionSum - arrSum;

    if (diff) {
        return diff;
    }
}


console.assert(
    missing([]) === undefined
);

console.assert(
    missing([1, 4, 3]) === 2
);

console.assert(
    missing([2, 3, 4]) === 1
);

console.assert(
    missing([5, 1, 4, 2]) === 3
);

console.assert(
    missing([1, 2, 3, 4]) === undefined
);
