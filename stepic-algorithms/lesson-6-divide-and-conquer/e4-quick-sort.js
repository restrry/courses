// https://stepik.org/lesson/Быстрая-сортировка-13249/step/6

process.stdin.setEncoding('utf8');
var chunks = '';

process.stdin.on('data', function(data) {
  chunks += data;
});

process.stdin.on('end', () => {
// input nLines, nPoints, lines[], points[]
const input = chunks
    .split('\n')
    .slice(1)

    const pointsStr = input.pop();
    const inputCopy = Array.from(input);

    const linesSortedByStart = toCoordsArray(input);
    const linesSortedByEnd = toCoordsArray(inputCopy);
    const points = head(toCoordsArray([pointsStr]));

    quickSort(byStart, linesSortedByStart);
    quickSort(byEnd, linesSortedByEnd);

    const output = points.map(point => pointIntersections(linesSortedByStart, linesSortedByEnd, point));

    process.stdout.write(output.join(' '));
});

function head(arr){
    return arr.length ? arr[0] : null;
}

function toCoordsArray(arrStr){
    return arrStr
        .map(i => i.split(' '))
        .map(arr => arr.map(item => Number(item)));
}

function swap(arr, idx1, idx2) {
    const temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;
}

function partition3(comparator, arr, start, end){
    let pivotLess = start;
    let pivotBigger = end;
    let i = pivotLess + 1;

    const pivotIndex = start;
    const pivotVal = arr[pivotIndex];

    while(i <= pivotBigger){
        const c = comparator(arr[i], pivotVal);
        switch(true){
            case   c > 0: swap(arr, i, pivotBigger--); break;
            case   c < 0: swap(arr, i++, pivotLess++); break;
            case c === 0: i++;                         break;
            default: throw new Error('comparator returns unexpected value:' + c);
        }
    }

    return [pivotLess, pivotBigger];
}

function quickSort(comparator, arr, start = 0, end = arr.length - 1){
    if(start >= end) return;

    const [lt, gt] = partition3(comparator, arr, start, end);

    quickSort(comparator, arr, start, lt - 1);
    quickSort(comparator, arr, gt + 1, end);
}

function byStart ([startA], [startB]) {
    return startA - startB;
}

function byEnd([, endA], [, endB]) {
    return endA - endB;
}

function pointIntersections(linesSortedByStart, linesSortedByEnd, point){
    const beforePoint = bisect(
        linesSortedByStart,
        point,
        (arr, i) => {
            const [start] = arr[i];
            return start;
        }
    );

    const afterPoint = bisect(
        linesSortedByEnd,
        point - 1, // we interested in points as [start, end), so end isn't included
        (arr, i) => {
            const [,end] = arr[i];
            return end;
        }
    );

    return beforePoint - afterPoint;
}

// return next position when value should be inserted to leave array sorted
function bisect(arr, value, getter = (arr, i) => arr[i]){
    let minIndex = 0;
    let maxIndex = arr.length - 1;

    while(minIndex <= maxIndex) {
        const midIndex = Math.floor((minIndex + maxIndex) / 2);

        if(getter(arr, midIndex) === value || ((midIndex - minIndex) === 0)) {
            minIndex = midIndex;
            break;
        }

        if(getter(arr, midIndex) < value){
            minIndex = midIndex + 1;
        } else {
            maxIndex = midIndex;
        }
    }

    while(minIndex < arr.length && getter(arr, minIndex) <= value){
        minIndex++;
    }

    return minIndex;
}
