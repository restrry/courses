// https://www.hackerrank.com/challenges/maximum-element
const { expect } = require('chai');

function execComand(stack, cmd, value){
    switch(cmd){
        case 1:
            stack.pushBack(value); break;
        case 2:
            stack.popBack(); break;
        case 3:
            return stack.getMax(); break;
        default:
            console.error('unknown comand');
    }
}

// implementation on array, on heap could be more efficent here, but requires more code
function Stack(){
    this.stack = [];
    this.maxStack = [];
}

const last = arr => arr.length ? arr[arr.length - 1] : null;

Stack.prototype.getMax = function getMax(){
    const currMax = last(this.maxStack);
    return currMax === null ? -Infinity : currMax;
}

Stack.prototype.pushBack = function pushBack(value){
    if(value >= this.getMax()){
        this.maxStack.push(value);
    }
    this.stack.push(value);
}

Stack.prototype.popBack = function popBack(){
    const value = this.stack.pop();
    if(value >= this.getMax()){
        this.maxStack.pop();
    }
    return value;
}

function run(cmds){
    const stack = new Stack();
    return cmds.map(cmd => execComand(stack, ...cmd)).filter(Boolean);
}

const cmds1 = [
    [1, 97],
    [2],
    [1, 20],
    [2],
    [1, 26],
    [1, 20],
    [2],
    [3],
    [1, 91],
    [3]
];

const output1 = [26, 91];

expect(run(cmds1)).to.deep.equal(output1);


var z = `10
1 97
2
1 20
2
1 26
1 20
2
3
1 91
3`;

z.split('\n').map(str => str.split(' ').map(Number)).slice(1); // ?
