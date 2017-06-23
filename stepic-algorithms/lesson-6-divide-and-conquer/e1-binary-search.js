// https://stepik.org/lesson/Двоичный-поиск-13246/step/4

process.stdin.setEncoding('utf8');
var chunks = '';

process.stdin.on('data', function(data) {
  chunks += data;
});

process.stdin.on('end', () => {
// input n, [...]
const input = chunks
    .split('\n')
    .map(i => i.split(' '))
    .map(arr => arr.slice(1).map(item => Number(item)));

const [arrayWhereToFind, arrayWhatToFind] = input;

var output = findAllInclusionIn(arrayWhereToFind, arrayWhatToFind)
    .map(i => i === -1 ? -1 : i + 1)
    .join(' ');

    process.stdout.write(output);
});

function findAllInclusionIn(arrayWhereToFind, arrayWhatToFind){
    return arrayWhatToFind.map(e => binarySearch(arrayWhereToFind, e));
}

function binarySearch(arr, item){
    let minIndex = 0;
    let maxIndex = arr.length - 1;
    while(minIndex <= maxIndex) {
        const pivotIndex = Math.floor((minIndex + maxIndex) / 2);
        if(arr[pivotIndex] === item){
            return pivotIndex;
        }

        if(arr[pivotIndex] < item){
            minIndex = pivotIndex + 1;
        } else {
            maxIndex = pivotIndex - 1;
        }
    }
    return -1;
}
