// https://www.hackerrank.com/challenges/largest-rectangle
const last = arr => arr.length ? arr[arr.length - 1] : null;

class Stack{
    constructor(){
        this.stack = [];
    }
    pushBack(value){
        this.stack.push(value);
        return this;
    }
    popBack(){
        return this.stack.pop();
    }
    peek(){
        return last(this.stack);
    }
    size(){
        return this.stack.length;
    }
    isEmpty(){
        return this.size() === 0;
    }
    iterate(fn){
        this.stack.forEach(fn);
        return this;
    }
    iterateRight(fn){
        let i = this.size() - 1;
        while(i >= 0){
            fn(this.stack[i], i);
            i -= 1;
        }
        return this;
    }
}

function findClosestMinFromLeft(arr){
    // find closest arr[i] < arr[current] index from left, where i <= current
    const left = new Stack();
    const min = Array(arr.length);
    for(let i = 0; i < arr.length; i++){
        while(!left.isEmpty() && arr[i] <= arr[left.peek()]){
            left.popBack();
        }

        // if stack is empty - we reached the left border or we found on peek stack smaller element
        min[i] = left.isEmpty() ? -1 : left.peek();

        left.pushBack(i);
    }

    return min;
}

function findClosestMinFromRight(arr){
    // find closest arr[j] < arr[current] index from right, where j >= current
    const right = new Stack();
    const min = Array(arr.length);
    var j = arr.length - 1;
    while(j >= 0){
        while(!right.isEmpty() && arr[j] <= arr[right.peek()]){
            right.popBack();
        }

        // reach the end ==> all element from right < current or
        // we found right.peek that is less than the current
        min[j] = right.isEmpty() ? arr.length : right.peek();

        right.pushBack(j);
        j -= 1;
    }

    return min;
}

function calcWidth(arr1, arr2){
    return zip2((v1, v2) => v2 - v1 - 1, arr1, arr2);
}

function calcSquare(widths, heights){
    return zip2((w, h) => w * h, widths, heights);
}

function zip2(fn, arr1, arr2){
    return arr1.map((v1, idx) => fn(v1, arr2[idx]));
}

function calcMaxWidth(arr){
    const closestMinFromLeft = findClosestMinFromLeft(arr);
    const closestMinFromRight = findClosestMinFromRight(arr);
    const widths = calcWidth(closestMinFromLeft, closestMinFromRight);
    return Math.max(...calcSquare(widths, arr));
}

const input1 = [1, 2, 3, 4, 5];
const output1 = 9;
console.assert(
    calcMaxWidth(input1) === output1
);

const input2 = [8979, 4570, 6436, 5083, 7780, 3269, 5400, 7579, 2324, 2116];
const output2 = 26152;
console.assert(
    calcMaxWidth(input2) === output2
);
