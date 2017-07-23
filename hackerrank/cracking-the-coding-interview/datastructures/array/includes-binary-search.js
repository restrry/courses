const getPivot = (start, end) => Math.floor((end + start) / 2);

function binarySearch(arr, n){
    let start = 0;
    let end = arr.length - 1;

    while(start <= end){
        const pivot = getPivot(start, end);

        if(arr[pivot] === n){
            return pivot;
        } else if (arr[pivot] < n){
            start = pivot + 1;
        } else {
            end = pivot - 1;
        }
    }

    return -1;
}

function includes(arr, n){
    return binarySearch(arr, n) !== -1;
}

console.assert(
    includes([1, 3, 8, 10], 8)     === true
);

console.assert(
    includes([1, 3, 8, 8, 15], 15) === true
);

console.assert(
    includes([1, 3, 8, 10, 15], 9) === false
);
