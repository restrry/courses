// https://www.hiredintech.com/classrooms/algorithm-design/lesson/12/task/14
// https://www.hackerrank.com/challenges/longest-increasing-subsequent
// O(N ^ 2) soultion has failed due to timeout error on hackerrank
function calcLongestSeq(arr){
    var cache = new Array(arr.length).fill(1);
    for(let i = 1; i < arr.length; i++){
        for(let j = 0; j < i; j++){
            if((arr[j] < arr[i]) && (cache[j] + 1 > cache[i])){
                cache[i] = cache[j] + 1;
            }
        }
    }

    return Math.max(...cache);
}

function processData(chunks) {
    const [n, ...input] = chunks.split('\n');

    const toNumber = i => Number(i);
    const numbers = input.map(toNumber);

    const output = calcLongestSeq2(numbers);

    process.stdout.write(String(output + '\n'));
}

const calcPivot = (start, end) => start + Math.floor((end - start) / 2);

const head = arr => arr[0];
const tail = arr => arr[arr.length - 1];

function findLeftmostPositionForInsertion(arr, n){
    let start = -1;
    let end = arr.length - 1;
    let pivot;

     while (end - start > 1) {
        pivot = calcPivot(end, start);
        if (arr[pivot] >= n ) {
            end = pivot;
        } else {
            start = pivot;
        }
    }

    return end;
}

// O (n * log (n)) solution. the algorithm is described here
// http://www.geeksforgeeks.org/?p=9591
// very carefully check findLeftmostPositionForInsertion implementation
// since it could change cache array.
function calcLongestSeq2(arr){
    var cache = [];
    cache[0] = arr[0];
    let j = 0;

    for(let i = 1; i < arr.length; i++){
        // first case - update the smallest number in sequence
        if(arr[i] < cache[0]){
            cache[0] = arr[i];
        // the second case - attach a largest element to a sequence
        } else if (arr[i] > tail(cache)){
            cache.push(arr[i]);
        // the third case - find largest element that is smaller than the current and replace it
        } else {
            const indexForInsertion = findLeftmostPositionForInsertion(cache, arr[i]);
            cache[indexForInsertion] = arr[i];
        }
    }

    return cache.length;
}

// -------------- suits ----------------
const input1 = [2, 7, 4, 3, 8];
console.assert(
    calcLongestSeq(input1) === 3
)

console.assert(
    calcLongestSeq2(input1) === 3
)


const input2 = [50, 3, 10, 7, 40, 80]
console.assert(
    calcLongestSeq(input2) === 4
);

console.assert(
    calcLongestSeq2(input2) === 4
);

const input3 = [10, 22, 9, 33, 21, 50, 41, 60, 80];
console.assert(
    calcLongestSeq(input3) === 6
);

console.assert(
    calcLongestSeq2(input3) === 6
);
