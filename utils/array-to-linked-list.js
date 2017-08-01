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

var input = {
    data: 1,
    next: {
        data: 1,
        next: {
            data: 3,
            next: {
                data: 3,
                next: {
                    data: 5,
                    next: {
                        data: 6,
                        next: null
                    }
                }
            }
        }
    }
}

expect(buildLinkedList([1, 1, 3, 3, 5, 6])).to.deep.equal(input);
