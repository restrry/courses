function indexOf(arr, n, startIndex = 0){
    let i = startIndex;
    while(i < arr.length){
        if(arr[i] === n){
            return i;
        }
        i++;
    }
    return -1;
}

console.assert(
    indexOf([1, 2, 3], 3) === 2
);

console.assert(
    indexOf([1, 2, 3], 4) === -1
);
