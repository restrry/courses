// https://www.codewars.com/kata/average-array/train/javascript
const { expect } = require('chai');

function zip(fn, arr){
    return arr.reduce(
        (acc, cur) => {
            cur.forEach((v, i) => {
                acc[i] = (acc[i] || []);
                acc[i].push(v);
            });
            return acc;
        }, []).map(fn);
}

function average(arr){
    if(!arr.length) return null;
    return sum(arr) / arr.length;
}

function sum(arr){
    return arr.reduce((s, v) => s + v, 0);
}

function avgArray(arr){
    return zip(average, arr);
}

const input1 = [[1, 2, 3, 4], [5, 6, 7, 8]];
const output1 = [3, 4, 5, 6];

expect(avgArray(input1)).to.deep.equal(output1);

const input2 = [[2, 3, 9, 10, 7], [12, 6, 89, 45, 3], [9, 12, 56, 10, 34], [67, 23, 1, 88, 34]];
const output2 = [22.5, 11, 38.75, 38.25, 19.5];

expect(avgArray(input2)).to.deep.equal(output2);


function avgArray2(arr) {
    return arr
        .reduce((acc, cur, idx) => {
            cur.forEach((v, i) => acc[i] = (acc[i] || 0) + v);
            return acc;
        }, [])
        .map(v => v / arr.length);
}

expect(avgArray2(input1)).to.deep.equal(output1);
expect(avgArray2(input2)).to.deep.equal(output2);
