const { expect } = require('chai');

function sortedInsert(head, data) {
    if(head === null) return createNode({ data });

    // new head is found
    if(head.data > data){
        const n = createNode({ data, next: head, prev: null });
        head.prev = n;
        return n;
    }

    let prevPointer = null;
    let currPointer = head;

    while(currPointer && currPointer.data < data){
        prevPointer = currPointer;
        currPointer = currPointer.next;
    }

    // we reached end
    if(currPointer === null){
        const next = null;
        const prev = prevPointer;
        const n = createNode({ data, next, prev });
        prev.next = n;
    } else {
        // we found next bigger
        const next = currPointer;
        const prev = prevPointer;
        const n = createNode({ data, next, prev });
        prev.next = n;
        next.prev = n;
    }

    return head;
}

function createNode({ data, next = null, prev = null }){
    return {data, next, prev};
}

const llToArray = ll => {
    const result = []
    while(ll){
        result.push(ll.data);
        ll = ll.next;
    }
    return result;
}

const input1 = [5, 1, 9, -1, 6, 8];
const ouput1 = input1.reduce(sortedInsert, null);

expect(llToArray(ouput1)).to.deep.equal(input1.sort());
