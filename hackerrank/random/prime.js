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

console.assert(
    isPrime(0) === false
)

console.assert(
    isPrime(1) === false
)

console.assert(
    isPrime(17) === true
)

console.assert(
    isPrime(10000000000000) === false
)

console.assert(
    isPrime(121342552159) === true
)
