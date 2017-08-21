// naive implmentation, could be implemneted faster
function factorial(n){
    let result = 1;

    while(n >= 2){
        result *= n;
        n -= 1;
    }

    return result;
}

console.assert(
    factorial(0) === 1
);

console.assert(
    factorial(1) === 1
);

console.assert(
    factorial(6) === 720
);
