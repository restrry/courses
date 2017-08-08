function reverse(head) {
    if(head === null) return null;
    [head.prev, head.next] = [head.next, head.prev];
    // iterate to the next node, which was inverted
    if(head.prev === null) return head; // reched the last one, termiate
    return reverse(head.prev);
}
