// https://stepik.org/lesson/Введение-13238/step/9
process.stdin.setEncoding('utf8');
var chunks = '';

process.stdin.on('data', function(data) {
    chunks += data;
});

process.stdin.on('end', () => {
    let [n, ...input] = chunks.split('\n');

    input = input
        .filter(Boolean)
        .map(i=>i.split(' ').map(Number));

    const resultArray = calcMinimalCommonPointsSet(input);
    const output = resultArray.length + '\n' + resultArray.join(' ');

    process.stdout.write(output);
});

function checkLinesIntersection(line1, line2){
    const [start1, end1] = line1;
    const [start2, end2] = line2;
    return start2 <= end1 && end2 >= start1;
}

function calcMinimalCommonPointsSet(linesArr){
    if(!linesArr.length){
        return [];
    }

    var commonPoints = [];
    const addToPoints = ([start, end]) => commonPoints.push(end);
    const lines = sortByEndPoint(linesArr);
    let pivot;

    pivot = lines[0];
    for(let i = 1; i < lines.length; i++){
        const next = lines[i];
        if(!checkLinesIntersection(pivot, next)){
            addToPoints(pivot);
            pivot = next;
        }
    }
    addToPoints(pivot);

    return commonPoints;
}

function sortByEndPoint(lines){
    return lines.sort(([start1, end1], [start2, end2]) => end1 - end2);
}

