const _head = arr => arr.length ? arr[0] : null;
const _tail = arr => arr.length ? arr[arr.length - 1] : null;

function Queue(){
    this.store = [];
}

Queue.prototype.isEmpty = function isEmpty(){
    return this.store.length === 0;
}

Queue.prototype.popFront = function popFront(){
    return this.store.shift();
}

Queue.prototype.popBack = function popBack(){
    return this.store.pop();
}

Queue.prototype.pushBack = function pushBack(v){
    this.store.push(v);
}

Queue.prototype.pushFront = function pushFront(v){
    this.store.unshift(v);
}

Queue.prototype.peekHead = function peekHead(v){
    return _head(this.store);
}

Queue.prototype.peekTail = function peekTail(v){
    return _tail(this.store);
}

function findSlidingMinimum(arr, windowSize){
    const queue = new Queue();
    let min = Infinity;
    var j = 0;
    while(j < windowSize - 1){
        while(!queue.isEmpty() && arr[queue.peekTail()] <= arr[j]){
            queue.popBack();
        }
        queue.pushBack(j);
        j++;
    }

    // track maximal indexes in queue. [prevMaxIndex, nextMaxIndex, nextnextMaxIndex...];
    for(let i = windowSize - 1; i < arr.length; i++){

        // remove from queue prev max index (out of current window)
        while(!queue.isEmpty() && queue.peekHead() <= i - windowSize){
            queue.popFront();
        }

        // remove from queue prev max index that are less than our element
        while(!queue.isEmpty() && arr[queue.peekTail()] <= arr[i]){
            queue.popBack();
        }

        // queue in state [preveMaxIndex,..., currentElement]
        queue.pushBack(i);
        min = Math.min(arr[queue.peekHead()], min);
    }

    return min;
}

console.assert(
    findSlidingMinimum([33, 11, 44, 11, 55], 1) === 11
);
console.assert(
    findSlidingMinimum([33, 11, 44, 11, 55], 2) === 33
);
console.assert(
    findSlidingMinimum([33, 11, 44, 11, 55], 3) === 44
);
console.assert(
    findSlidingMinimum([33, 11, 44, 11, 55], 4) === 44
);
console.assert(
    findSlidingMinimum([33, 11, 44, 11, 55], 5) === 55
);
