const { expect } = require('chai');

// solution via binary search, works only for sorted input array
function calcParlors(money, prices){
    for(let i = 0; i < prices.length; i++){
        const v = prices[i];
        const indexSecond = binarySearch(money - v, prices);
        if(indexSecond !== -1 && indexSecond !== i){
            return [i, indexSecond];
        }
    }
}

const calcMiddleIdx = (l, r) => l + Math.floor((r - l) / 2);
function binarySearch(value, arr){
    let l = -1;
    let r = arr.length - 1;
    while(l <= r){
        let m = calcMiddleIdx(l ,r);
        if(arr[m] === value) {
            return m;
        }
        if(arr[m] < value){
            l = m;
        } else {
            r = m;
        }
    }

    return -1;
}

const money1 = 5;
const prices1 = [1, 2, 3, 4, 5];
calcParlors(money1, prices1); // ?

const money2 = 4;
const prices2 = [2, 2, 3, 4];
calcParlors(money2, prices2); // ?


function calcParlors2(money, prices){
    const cache = new Map();
    for(let i = 0; i < prices.length; i++){
        const v = prices[i];

        if(cache.has(money - v)){
            return [cache.get(money - v), i];
        }
        cache.set(v, i);
    }
}

const money3 = 4;
const prices3 = [1, 4, 5, 3, 2];
const output3 = [0, 3];
expect(calcParlors2(money3, prices3)).to.deep.equal(output3);

const money4 = 4;
const prices4 = [2, 2, 4, 3];
const output4 = [0, 1];
expect(calcParlors2(money4, prices4)).to.deep.equal(output4);

