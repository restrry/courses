// https://www.hackerrank.com/challenges/ctci-array-left-rotation
// rotateN([1, 2, 3, 4, 5], 2) ==> [3, 4, 5, 1, 2]
function rotateN(array, n){
    while(n--){
        circularShift(array);
    }
}

function circularShift(arr){
    arr.push(arr.shift());
}
