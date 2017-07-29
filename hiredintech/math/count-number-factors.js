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

const input1 = 12;
expect(calcCountFactorsFor(input1)).to.have.length(6);
expect(calcCountFactorsFor(input1)).to.deep.equal([1, 2, 3, 4, 6, 12]);

const input2 = 20;
expect(calcCountFactorsFor(input2)).to.have.length(6);
expect(calcCountFactorsFor(input2)).to.deep.equal([1, 2, 4, 5, 10, 20]);

const input3 = 35;
expect(calcCountFactorsFor(input3)).to.have.length(4);
expect(calcCountFactorsFor(input3)).to.deep.equal([1, 5, 7, 35]);

const input4 = 49;
expect(calcCountFactorsFor(input4)).to.have.length(3);
expect(calcCountFactorsFor(input4)).to.deep.equal([1, 7, 49]);

const input5 = 1;
expect(calcCountFactorsFor(input5)).to.have.length(1);
expect(calcCountFactorsFor(input5)).to.deep.equal([1]);
