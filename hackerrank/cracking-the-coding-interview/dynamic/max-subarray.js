// https://www.hackerrank.com/challenges/maxsubarray/problem

const { expect } = require('chai');

function findMaxSumSubarrayContiguous(arr){
    const maxStore = new Array(arr.length).fill(0);
    maxStore[0] = arr[0];
    for(let i = 1; i < maxStore.length; i++){
        maxStore[i] = Math.max(arr[i], maxStore[i-1] + arr[i]);
    }
    return Math.max(...maxStore);
}

function findMaxSumSubarrayNonContiguous(arr){
    const maxStore = new Array(arr.length).fill(0);
    maxStore[0] = arr[0];
    for(let i = 1; i < maxStore.length; i++){
        maxStore[i] = Math.max(maxStore[i-1], arr[i], maxStore[i-1] + arr[i]);
    }

    return Math.max(...maxStore);
}

function calcMaxs(arr){
    return [
        findMaxSumSubarrayContiguous(arr),
        findMaxSumSubarrayNonContiguous(arr)
    ];
}

const input1 = [2, -1, 2, 3, 4, -5];
const result1 = calcMaxs(input1);
expect(result1).to.deep.equal([10, 11]);

const input2 = [-2, 0, -1, -2, -3];
const result2 = calcMaxs(input2);
expect(result2).to.deep.equal([0, 0]);

const input3 = [-1, -2, -3];
const result3 = calcMaxs(input3);
expect(result3).to.deep.equal([-1, -1]);

const isOdd = i => i % 2;

function main(chunks){
    const [n, ...inputs] = chunks.split('\n');
    var arrays = inputs.filter((val, idx) => isOdd(idx)).map(str => str.split(' ').map(Number));
    arrays.map(calcMaxs).forEach(array => console.log(array.join(' ')))
}
