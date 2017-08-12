// https://www.hackerrank.com/challenges/ctci-recursive-staircase/problem

// bottom up solution
function countVariantWays(n){
    const A = new Array(n + 1).fill(0);
    A[0] = 0;
    A[1] = 1;
    A[2] = 2; // 1+1; 2
    A[3] = 4; // 1+1+1; 1+2; 2+1; 3

    for(let i = 4; i <= n; i++){
        A[i] = A[i-1] + A[i-2] + A[i-3];
    }

    return A[n]
}

console.assert(
    countVariantWays(1) === 1
);
console.assert(
    countVariantWays(3) === 4
);
console.assert(
    countVariantWays(7) === 44
);

// up bottom recursive solution
const cache = [0, 1, 2, 4];
function countVariantWays2(n){
    if(typeof cache[n] !== 'undefined'){
        return cache[n];
    }
    cache[n] = countVariantWays2(n-1) + countVariantWays2(n-2) + countVariantWays2(n-3);
    return cache[n];
}

console.assert(
    countVariantWays2(1) === 1
);
console.assert(
    countVariantWays2(3) === 4
);
console.assert(
    countVariantWays2(7) === 44
);
