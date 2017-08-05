function findMergeNode(headA, headB) {
    const lengthA = getLinkedListLength(headA);
    const lengthB = getLinkedListLength(headB);
    let [maxHead, minHead] = lengthA >= lengthB
        ? [headA, headB]
        : [headB, headA];

    // fast forward
    let diff = Math.abs(lengthA - lengthB);
    while(diff){
        maxHead = maxHead.next;
        diff -= 1;
    }

    while(maxHead && minHead){
        if(maxHead === minHead) {
            return maxHead.data;
        }
        maxHead = maxHead.next;
        minHead = minHead.next;
    }

    return null;
}

function getLinkedListLength(head){
    let n = 0;
    while(head){
        n++;
        head = head.next;
    }
    return n;
}
