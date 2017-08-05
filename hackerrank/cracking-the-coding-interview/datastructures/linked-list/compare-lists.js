var input1 = {
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

var input2 = {
    data: 1,
    next: {
        data: 3,
        next: {
            data: 5,
            next: null
        }
    }
}

function _compareLinkedLists(headA, headB) {
    while(headA && headB){
        if(headA.data !== headB.data) return false;
        headA = headA.next;
        headB = headB.next;
    }

    return headA === headB;
}

function compareLinkedLists (headA, headB) {
    return Number(_compareLinkedLists(headA, headB));
}
compareLinkedLists(input1, input2) // ?
