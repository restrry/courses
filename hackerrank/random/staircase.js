// https://www.hackerrank.com/challenges/staircase/problem
const { expect } = require('chai');

function buildLadderWithHeight(n, { symbol = '#', paddingSymbol = '_' } = {}){
    const result = [];
    for(let i = 1; i <= n; i++){
        const step = symbol.repeat(i);
        const line = paddingStart(step, paddingSymbol, n - i);
        result.push(line);
    }
    return result;
}

const paddingStart = (str, symbol = '', n = 0) => symbol.repeat(n) + str;
const reverseStr = str => str.split('').reverse().join('');

function buildPyramidWithHeight(n){
    const sideA = buildLadderWithHeight(n);
    const sideB = buildLadderWithHeight(n).map(reverseStr);
    return sideA.map((strA, idx) => strA + sideB[idx]);
}


const output1 = ['___#', '__##', '_###', '####'];
const output2 = ['___##___', '__####__', '_######_', '########'];
expect(buildLadderWithHeight(4)).to.deep.equal(output1);
expect(buildPyramidWithHeight(4)).to.deep.equal(output2);
