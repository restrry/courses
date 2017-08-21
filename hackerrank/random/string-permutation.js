const { expect } = require('chai');

function permute(str){
    const strArr = Array.from(str);
    return permuteArr(strArr).map(arr => arr.join(''));
}

function permuteArr(arr){
    const result = [];

    if(arr.length === 2){
        result.push([arr[0], arr[1]]);
        result.push([arr[1], arr[0]]);
    }

    for(var i = 0; i < arr.length; i++){
        permuteArr(arr.filter(k => k !== arr[i])).forEach(a => result.push([arr[i], ...a]));
    }

    return result;
}

// naive implmentation, could be implemneted faster
function factorial(n){
    let result = 1;

    while(n >= 2){
        result *= n;
        n -= 1;
    }

    return result;
}

const input1 = '';
const output1 = [];
expect(permute(input1)).to.have.members(output1);

const input2 = 'abc';
const output2 = ['abc', 'acb', 'bac', 'bca', 'cab', 'cba'];
expect(permute(input2)).to.have.length(factorial(input2.length));
expect(permute(input2)).to.have.members(output2);

const input3 = 'abcd';
const output3 =  [
    'abcd',
    'abdc',
    'acbd',
    'acdb',
    'adbc',
    'adcb',
    'bacd',
    'badc',
    'bcad',
    'bcda',
    'bdac',
    'bdca',
    'cabd',
    'cadb',
    'cbad',
    'cbda',
    'cdab',
    'cdba',
    'dabc',
    'dacb',
    'dbac',
    'dbca',
    'dcab',
    'dcba'
]

expect(permute(input3)).to.have.length(factorial(input3.length));
expect(permute(input3)).to.have.members(output3);
