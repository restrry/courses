const { expect } = require('chai');

const flatten = (input) =>
    input.reduce((acc, x) =>
        [].concat(acc, Array.isArray(x) ? flatten(x) : x),
        []
    );


const input1 = [[[1]], [2, 3], 4, 5, [6, [7]]];
const output1 = [1, 2, 3, 4, 5, 6, 7];

expect(flatten(input1)).to.deep.equal(output1);


const input2 = ['a', ['b', 2], 3, null, [[4], ['c']]];
const output2 = ['a', 'b', 2, 3, null, 4, 'c'];

expect(flatten(input2)).to.deep.equal(output2);

const forEachRight = (arr, fn) => {
    let i = arr.length - 1;
    while(i >= 0){
        fn(arr[i]);
        i -= 1;
    }
}
const flatten2 = (input) => {
    const queue = [input];
    const result = [];
    while(queue.length){
        const head = queue.shift();
        if(Array.isArray(head)){
            forEachRight(head, i => queue.unshift(i));
        } else {
            result.push(head);
        }
    }
    return result;
}

expect(flatten2(input1)).to.deep.equal(output1);
expect(flatten2(input2)).to.deep.equal(output2);
