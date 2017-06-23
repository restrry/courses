// https://stepik.org/lesson/Сортировка-слиянием-13248/step/5

process.stdin.setEncoding('utf8');
var chunks = '';

process.stdin.on('data', function(data) {
  chunks += data;
});

process.stdin.on('end', () => {
// input n, [...]
    const [input] = chunks
        .split('\n')
        .slice(1)
        .map(i => i.split(' '))
        .map(arr => arr.map(item => Number(item)));

    const output = calcIncersionNumberFor(input);

    process.stdout.write(String(output));
});

function calcIncersionNumberFor(arr){
    let inversionCount = 0;

    // NOTE: merge is not in place
    function merge(arr1, arr2){
        const result = [];
        let i = 0;
        let j = 0;

        while(i < arr1.length && j < arr2.length){
            if(arr1[i] <= arr2[j]){
                result.push(arr1[i]);
                i++;
            } else {
                inversionCount += (arr1.length - i);
                result.push(arr2[j]);
                j++;
            }
        }

        return [].concat(result, arr1.slice(i), arr2.slice(j));
    }

    function mergeSort(arr, minIndex = 0, maxIndex = arr.length - 1){
        if(minIndex === maxIndex){
            return [arr[minIndex]];
        }

        const pivotIndex = Math.floor((minIndex + maxIndex) / 2);
        const left = mergeSort(arr, minIndex, pivotIndex);
        const right = mergeSort(arr, pivotIndex + 1, maxIndex);
        return merge(left, right);
    }

    mergeSort(arr);

    return inversionCount;
}

// // merge with stack without recursion
// function mergeSort(arr){
//     const queue = new Queue();

//     arr.forEach(i => queue.pushBack([i]));

//     while(queue.size > 1){
//         queue.pushBack(merge(queue.popFront(), queue.popFront()));
//     }

//     return queue.popFront();
// }

// function Queue(){
//     const queue = [];
//     return {
//         popFront(){
//             return queue.shift();
//         },
//         pushBack(i){
//             return queue.push(i);
//         },
//         get size(){
//             return queue.length;
//         }
//     }
// }
