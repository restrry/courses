function isSorted(arr, comparator = (a, b) => a < b){
    let i = arr.length - 1;
    while(i > 0) {
        if(comparator(arr[i], arr[i - 1])){
            return false;
        }
        i -= 1;
    }
    return true;
}


console.assert(
    isSorted([]) === true
);

console.assert(
    isSorted([-Infinity, -5, 0, 3, 9]) === true
);

console.assert(
    isSorted([3, 9, -3, 10]) === false
);
