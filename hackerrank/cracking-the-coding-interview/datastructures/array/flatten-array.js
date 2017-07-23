const { expect } = require('chai');

function flatten(...args){
    return args.reduce((acc, x) => {
            return [].concat(acc, Array.isArray(x) ? flatten(...x) : x);
    }, []);
};


const input1 = [1, [2, 3], 4, 5, [6, [7]]];
const output1 = [1, 2, 3, 4, 5, 6, 7];

expect(flatten(...input1)).to.deep.equal(output1);


const input2 = ['a', ['b', 2], 3, null, [[4], ['c']]];
const output2 = ['a', 'b', 2, 3, null, 4, 'c'];

expect(flatten(...input2)).to.deep.equal(output2);
