var input = {
    data: 1,
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

function getNodeValue(head, position) {
    let delayPointer = head;
    let pointer = head;
    while(pointer.next){
        if(position > 0){
            position--;
        } else {
            delayPointer = delayPointer.next;
        }
        pointer = pointer.next;
    }
    return delayPointer.data;
}

console.assert(
    getNodeValue(input, 0) === 6
);

console.assert(
    getNodeValue(input, 2) === 3
);
