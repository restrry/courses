// https://www.hackerrank.com/challenges/ctci-lonely-integer
const input = [0, 0, 1, 2, 1];

const findLonelyNumberIn = (array) => array.reduce((a, b) => a ^ b);

const output = findLonelyNumberIn(input);

console.assert(output === 2);
