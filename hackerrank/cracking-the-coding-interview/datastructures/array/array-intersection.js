const { expect } = require('chai');

function intersection1(arr1, arr2){
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);

    const res = [];
    set1.forEach(i => {
        if(set2.has(i)){
            res.push(i);
        }
    })

    return res;
}

const input11 = [1, 5, 4, 2];
const input12 = [8, 91, 4, 1, 3];
const output1 = [4, 1];
expect(intersection1(input11, input12)).to.have.members(output1);

const input21 = [1, 5, 4, 2];
const input22 = [7, 12];
const output2 = [];
expect(intersection1(input21, input22)).to.have.members(output2);

function intersection2(arr1, arr2){
    const cache = {};
    const result = [];

    for(let i = 0; i < arr1.length; i++){
        cache[arr1[i]] = true;
    }

    for(let j = 0; j < arr2.length; j++){
        if(cache[arr2[j]]){
            result.push(arr2[j]);
        }
    }

    return result;
}

expect(intersection2(input11, input12)).to.have.members(output1);
expect(intersection2(input21, input22)).to.have.members(output2);
