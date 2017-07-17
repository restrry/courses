// https://www.hiredintech.com/classrooms/algorithm-design/lesson/76/task/26
function jumpOverArray(arr){
    if(!arr.length) {
        return -1;
    }

    let i = 0;
    let jumps = 0;
    while (i < arr.length) {
        i += arr[i];
        jumps += 1;
    }

    return jumps;
}

const input1 = [3, 4, 1, 2, 5, 6, 9, 0, 1, 2, 3, 1];
const output1 = 4;

console.assert(jumpOverArray(input1) === output1);

const input2 = [];
const output2 = -1;
console.assert(jumpOverArray(input2) === output2);

const input3 = [1];
const output3 = 1;
console.assert(jumpOverArray(input3) === output3);

const input4 = [1, 1, 1, 1, 1];
const output4 = 5;
console.assert(jumpOverArray(input4) === output4);
