const { expect } = require('chai');

function uniq(arr){
    return Array.from(new Set(arr));
}

const input1 = [1, 4, 2, 2, 3, 4, 8];
const output1 = [1, 4, 2, 3, 8];
expect(uniq(input1)).to.deep.equal(output1);

const input2 = [];
const output2 = [];
expect(uniq(input2)).to.deep.equal(output2);

const input3 = [1, 1, 1, 1];
const output3 = [1];
expect(uniq(input3)).to.deep.equal(output3);
