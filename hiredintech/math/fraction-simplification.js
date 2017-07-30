// https://www.hiredintech.com/classrooms/algorithm-design/lesson/23/task/20
const { expect } = require('chai');

function calcGCD(a, b){
    if (a === 0) return b;
    if (b === 0) return a;

    if(a > b){
        return calcGCD(a % b, b);
    } else {
        return calcGCD(a, b % a);
    }
}

function calcFractionSimplification(tuple){
    const gcd = calcGCD(...tuple);
    return tuple.map(i => i / gcd);
}


const input1 = [77, 22];
const output1 = [7, 2];

expect(calcFractionSimplification(input1)).to.deep.equal(output1);

const input2 = [6, 7];
const output2 = [6, 7];
expect(calcFractionSimplification(input2)).to.deep.equal(output2);

const input3 = [0, 5];
const output3 = [0, 1];
expect(calcFractionSimplification(input3)).to.deep.equal(output3);
