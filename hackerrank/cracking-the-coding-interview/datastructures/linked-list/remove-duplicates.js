const { expect } = require('chai');

function buildLinkedList(arr){
    const result = {};

    arr.reduce((acc, v, idx) => {
        acc.data = v;
        acc.next = idx === arr.length - 1 ? null : {};
        return acc.next;
    }, result);

    return result;
}

function removeDuplicates(head) {
    if(!head) return null;
    let pointer = head;
    while(pointer.next){
        if(pointer.data === pointer.next.data){
            pointer.next = pointer.next.next;
        } else {
            pointer = pointer.next;
        }
    }
}

const llToArray = ll => {
    const result = []
    while(ll){
        result.push(ll.data);
        ll = ll.next;
    }
    return result;
}

const input1 = buildLinkedList([1, 1, 3, 3, 5, 6]);
removeDuplicates(input1);
const resul1 = llToArray(input1);
expect(resul1).to.deep.equal([1, 3, 5, 6]);

const input2 = buildLinkedList([1, 1]);
removeDuplicates(input2);
const resul2 = llToArray(input2);
expect(resul2).to.deep.equal([1]);

const input3 = null;
removeDuplicates(input3);
const resul3 = input3;
expect(resul3).to.equal(null);
