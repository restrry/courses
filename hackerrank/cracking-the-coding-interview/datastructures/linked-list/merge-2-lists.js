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

function mergeLinkedLists(headA, headB) {
    if(headA === null) return headB;
    if(headB === null) return headA;

    let pointerHead;

    if(headA.data <= headB.data){
        pointerHead = headA;
        headA = headA.next;
    } else {
        pointerHead = headB;
        headB = headB.next;
    }

    let pointer = pointerHead;

    while(headA && headB){
        if(headA.data <= headB.data){
            pointer.next = headA;
            headA = headA.next;
        } else {
            pointer.next = headB;
            headB = headB.next;
        }

        pointer = pointer.next;
    }

    if(headA) {
        pointer.next = headA;
    }

    if(headB) {
        pointer.next = headB;
    }

    return pointerHead;
}

const merged = mergeLinkedLists(
    buildLinkedList([1, 3, 5, 9, 12]),
    buildLinkedList([2, 4, 6])
)

const llToArray = ll => {
    const result = []
    while(ll){
        result.push(ll.data);
        ll = ll.next;
    }
    return result;
}

const input11 = buildLinkedList([1, 3, 5, 9, 12]);
const input12 = buildLinkedList([2, 4, 6]);
const resul1 = llToArray(mergeLinkedLists(input11, input12));
expect(resul1).to.deep.equal([1, 2, 3, 4, 5, 6, 9, 12]);

const input21 = buildLinkedList([1, 2, 3]);
const input22 = null;
const resul2 = llToArray(mergeLinkedLists(input21, input22));
expect(resul2).to.deep.equal([1, 2, 3]);

const input31 = null
const input32 = null;
const resul3 = mergeLinkedLists(input31, input32);
expect(resul3).to.equal(null);
