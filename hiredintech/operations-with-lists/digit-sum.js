// https://www.hiredintech.com/classrooms/algorithm-design/lesson/76/task/27

function digitSum(n){
    let sum = 0;
    n = Math.abs(n);

    while(n > 9){
        sum += n % 10;
        n = Math.floor(n / 10);
    }

    sum += n;
    return sum;
}

const input1 = 10;
const output1 = 1;
console.assert(digitSum(input1) === output1);

const input2 = 2;
const output2 = 2;
console.assert(digitSum(input2) === output2);

const input3 = -3456;
const output3 = 18;

console.assert(digitSum(input3) === output3);

const input4 = 1325132435356;
const output4 = 43;
console.assert(digitSum(input4) === output4);
