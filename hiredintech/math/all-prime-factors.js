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

function findPrimerFactorsFor(number){
    const limit = Math.floor(Math.sqrt(number));
    const result = [];
    let i = 2;
    while(number > 1 && i <= limit){
        if(number % i === 0){
             result.push(i);
             number = number / i;
        } else {
            i = getNextPrime(i);
        }
    }

    if(number > 1){
        result.push(number);
    }
    return result;
}

const input1 = 6552;
const output1 = [2, 2, 2, 3, 3, 7, 13];
expect(findPrimerFactorsFor(input1)).to.deep.equal(output1);

const input2 = 20;
const output2 = [2, 2, 5];
expect(findPrimerFactorsFor(input2)).to.deep.equal(output2);

const input3 = 64;
const output3 = [2, 2, 2, 2, 2, 2];
expect(findPrimerFactorsFor(input3)).to.deep.equal(output3);

const input4 = 1105;
const output4 = [5, 13, 17];
expect(findPrimerFactorsFor(input4)).to.deep.equal(output4);

const input5 = 9901;
const output5 = [9901];
expect(findPrimerFactorsFor(input5)).to.deep.equal(output5);
