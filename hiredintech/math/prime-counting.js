// https://www.hiredintech.com/classrooms/algorithm-design/lesson/23/task/30
const { expect } = require('chai');

// the idea is described on:
// http://www.geeksforgeeks.org/primality-test-set-1-introduction-and-school-method/
function isPrime(n){
    // prime = (6k + i), where i = [-1...4]
    if (n <= 1)  return false;
    if (n <= 3)  return true;
 
    // cover cases for (6k + 0), (6k + 2), (6k + 4) & (6k + 3)
    if (n % 2 === 0 || n % 3 === 0) return false;
 
    // cover case for 6k ± 1
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) {
           return false;
        }
    }

    return true;
}

// there is more efficent solution, but we stick with simplier
function getNextPrime(n) {
    // 2 is only even prime, so we check here and iterate with step 2
    if(n === 2) return 3;

    while(true){
        n += 2;
        if(isPrime(n)){
            return n;
        }
    }
}

function calcAllPrimesBelow(number){
    if(number < 2) return 0;
    let count = 0;
    let current = 2;
    while(current <= number){
        count++;
        // here also we could add limit in getNextPrime, but that's not a problem
        current = getNextPrime(current);
    }
    return count;
}

console.assert(
    calcAllPrimesBelow(10) === 4
)

console.assert(
    calcAllPrimesBelow(31) === 11
)
