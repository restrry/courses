// https://www.hackerrank.com/challenges/equal-stacks

const last = arr => arr.length ? arr[arr.length - 1] : null;

// could be implemented through inheritance, not sure hackerrack supports all es6 features
function Stack(){
    this.stack = [];
    this.heightByStep = [];
}

Stack.prototype.onPushBack = function onPushBack(value){
    const prevValue = last(this.heightByStep) || 0;
    this.heightByStep.push(prevValue + value);
}

Stack.prototype.pushBack = function pushBack(value){
    this.onPushBack(value);
    this.stack.push(value);
}

Stack.prototype.onPopBack = function onPopBack(value){
    this.heightByStep.pop();
}

Stack.prototype.popBack = function popBack(){
    this.onPopBack();
    return this.stack.pop();
}

Stack.prototype.peek = function popBack(){
    return last(this.stack);
}

function buildStack(values){
    const stack = new Stack();
    values.forEach(v => stack.pushBack(v));
    return stack;
}

const getPivot = (start, end) => Math.floor((end + start) / 2);
function binarySearch(arr, n){
    let start = 0;
    let end = arr.length - 1;

    while(start <= end){
        const pivot = getPivot(start, end);

        if(arr[pivot] === n){
            return pivot;
        } else if (arr[pivot] < n){
            start = pivot + 1;
        } else {
            end = pivot - 1;
        }
    }

    return -1;
}

function findMaxIntersection(...arr){
    const [firstArr, ...otherArr] = arr;
    var i = firstArr.length - 1;
    var value;
    while(i >= 0){
        value = firstArr[i];

        const hasIntersection = otherArr.every(arr => binarySearch(arr, value) !== -1);
        if(hasIntersection) {
            return value;
        }
        i -= 1;
    }
    return null;
}

function findMaxCommonHeight(...stackValues){
    // reverese since by condition order passed reversed
    const stacks = stackValues.map(a => a.reverse()).map(buildStack);
    const height = findMaxIntersection(...stacks.map(s => s.heightByStep));
    return height || 0;
}

const stack11 = [3, 2, 1, 1, 1];
const stack12 = [4, 3, 2];
const stack13 = [1, 1, 4, 1];
const output1 = 5;

console.assert(
    findMaxCommonHeight(stack11, stack12, stack13) === output1
);

const stack21 = [3, 2, 1, 1, 1];
const stack22 = [];
const stack23 = [1, 1, 4, 1];
const output2 = 0;

console.assert(
    findMaxCommonHeight(stack21, stack22, stack23) === output2
);

const stack31 = [1, 1, 1, 1, 1];
const stack32 = [3, 2];
const stack33 = [1, 3, 1];
const output3 = 5;

console.assert(
    findMaxCommonHeight(stack31, stack32, stack33) === output3
);
