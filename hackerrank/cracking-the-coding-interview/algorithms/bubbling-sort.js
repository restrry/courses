const { expect } = require('chai');

function swap(arr, i, j){
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function sortBubble(arr){
    let swapsCount = 0;
    let swapped;
    for(let i = 0; i < arr.length; i++){
        swapped = false;

        for(let j = 0; j < arr.length - 1; j++){
            if(arr[j] > arr[j + 1]){
                swap(arr, j, j + 1);
                swapped = true;
                swapsCount++;
            }
        }

        if (!swapped) {
            break;
        }
    }

    return { array: arr, swaps: swapsCount };
}

expect(sortBubble([3, 2, 1]).array).to.deep.equal([1, 2, 3]);
expect(sortBubble([3, 2, 1]).swaps).to.equal(3);


expect(sortBubble([1, 2, 3]).array).to.deep.equal([1, 2, 3]);
expect(sortBubble([1, 2, 3]).swaps).to.equal(0);

