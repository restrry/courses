// https://stepik.org/lesson/Сортировки-основанные-не-на-сравнениях-13252/step/3

process.stdin.setEncoding('utf8');
var chunks = '';

process.stdin.on('data', function(data) {
  chunks += data;
});

const toNumber = i => Number(i);
process.stdin.on('end', () => {
    // formar: n \n nums[]
    const [n, input] = chunks.split('\n');
    const numbers = input.split(' ').map(toNumber);

    const output = countSort(numbers);

    process.stdout.write(output.join(' '));
});

// in task n[], where 0 <= n <= 10
function countSort(arr){
    const counter = {};
    for(let i = 0; i < arr.length; i++){
        counter[arr[i]] = (counter[arr[i]] || 0) + 1;
    }

    const keys = Object.keys(counter);
    for(let i = 1; i < keys.length; i++){
        counter[keys[i]] = counter[keys[i]] + counter[keys[i - 1]];
    }

    const res = [];
    for(let i = arr.length - 1; i >= 0; --i){
        const newPos = counter[arr[i]];
        res[newPos] = arr[i];
        // fill array from the end
        counter[arr[i]] = counter[arr[i]] - 1;
    }

    res.shift(); // since index starts from 0, not 1;
    return res;
}
