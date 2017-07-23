function calcInverstion(arr){
    let inversionCount = 0;

    function mergeSort(arr, l = 0, r = arr.length - 1){
        if(r === l) return [arr[r]];

        const m = Math.floor((r + l) / 2);
        return merge(
            mergeSort(arr, l, m),
            mergeSort(arr, m + 1, r)
        );
    }

    function merge(arr1, arr2){
        let i = 0;
        let j = 0;
        const result = [];

        while(i < arr1.length && j < arr2.length){
            if(arr1[i] <= arr2[j]){
                result.push(arr1[i]);
                i++;
            } else {
                result.push(arr2[j]);
                j++;

                inversionCount += (arr1.length - i);
            }
        }

        return [].concat(result, arr1.slice(i), arr2.slice(j));
    }

    mergeSort(arr);

    return inversionCount;
}

console.assert(
    calcInverstion([1, 1, 1, 2, 2]) === 0
)
console.assert(
    calcInverstion([2, 1, 3, 1, 2]) === 4
);
