function reduce(values, fn, startValue){
    let prev = startValue;
    for(let i = 0; i < values.length; i++){
        const curr = values[i];
        prev = fn(values[i], prev);
    }
    return prev;
}

console.assert(
    reduce([1, 2, 3, 4], (a, b) => a + b, 0) === 10
);
