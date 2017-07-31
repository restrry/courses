const { expect } = require('chai');

const last = arr => arr.length ? arr[arr.length - 1] : null;

function Stack(){
    this.stack = [];
}

Stack.prototype.pushBack = function pushBack(value){
    this.stack.push(value);
}

Stack.prototype.popBack = function popBack() {
    return this.stack.pop();
}

Stack.prototype.peek = function peek() {
    return last(this.stack);
}

Stack.prototype.size = function size() {
    return this.stack.length;
}

Stack.prototype.isEmpty = function isEmpty() {
    return this.stack.length === 0;
}

function Queue(){
    this.valueStore = new Stack();
    this.tempStore = new Stack();
}

Queue.prototype.pushBack = function pushBack(value) {
    this.tempStore.pushBack(value);
}

Queue.swapStacks = function swapStacks(s1, s2){
    while(!s1.isEmpty()){
        s2.pushBack(s1.popBack());
    }
}

Queue.prototype.popFront = function popFront() {
    if(!this.valueStore.isEmpty()){
        return this.valueStore.popBack();
    } else {
        Queue.swapStacks(this.tempStore, this.valueStore);
        return this.valueStore.popBack();
    }
}

Queue.prototype.peek = function peek() {
    if(!this.valueStore.isEmpty()){
        return this.valueStore.peek();
    } else {
        Queue.swapStacks(this.tempStore, this.valueStore);
        return this.valueStore.peek();
    }
}

function execComands(queue, cmds){
    return cmds
        .map(([cmd, value]) => {
            switch(cmd){
                case '1':
                    queue.pushBack(value); break;
                case '2':
                    queue.popFront(); break;
                case '3':
                    return queue.peek(); break;
                default:
                    throw new Error(`unknown command ${cmd}`);
            }
        })
        .filter(Boolean);
}

function run(cmds){
    const queue = new Queue();
    return execComands(queue, cmds);
}

var input1 = `10
1 42
2
1 14
3
1 28
3
1 60
1 78
2
2`;

function formatData(input){
    return input
        .split('\n')
        .slice(1)
        .map(i => i.split(' '));
}

const cmds1 = formatData(input1);

expect(run(cmds1)).to.deep.equal(['14', '14']);
