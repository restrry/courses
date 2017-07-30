// https://www.hiredintech.com/classrooms/algorithm-design/lesson/23/task/22
const { expect } = require('chai');

function calcCountFactorsFor(number){
    const limit = Math.floor(Math.sqrt(number));
    const factors = new Set([1, number]);
    for (let i = 2; i <= limit; i++){
        if(number % i === 0){
            factors.add(i);
            factors.add(number / i);
        }
    }

    return [...factors].sort((a, b) => a - b);
}

const sum = arr => arr.reduce((s, v) => s + v, 0);
const compose = (...fns) => x => fns.reduce((v, fn) => fn(v), x);
const calcSumOfFactors = compose(calcCountFactorsFor, sum);

const input1 = 8;
const output1 = 15;
expect(calcSumOfFactors(input1)).to.equal(output1);

const input2 = 7;
const output2 = 8;
expect(calcSumOfFactors(input2)).to.equal(output2);

const input3 = 1;
const output3 = 1;
expect(calcSumOfFactors(input3)).to.equal(output3);

const input4 = 1000;
const output4 = 2340;
expect(calcSumOfFactors(input4)).to.equal(output4);
