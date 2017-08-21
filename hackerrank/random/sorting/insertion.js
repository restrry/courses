function swap(arr, i, j){
    [arr[i], arr[j]] = [arr[j], arr[i]];
}

function insertionSort(arr){
    for (let i = 1; i < arr.length; i++){
        let j = i;
        while(j && arr[j - 1] > arr[j]){
            swap(arr, j, j - 1);
            j -= 1;
        }
    }
    return arr;
}

const input1 = [1, 4, 3, 5, 6, 2 ];

insertionSort(input1); // ?
