function hasCycle(head){
    let delayPointer = head;
    let pointer = head;
    while(pointer && delayPointer && pointer.next){
        pointer = pointer.next.next;
        delayPointer = delayPointer.next;
        if(pointer === delayPointer){ 
            return true;
        }
    }
    return false;
}
