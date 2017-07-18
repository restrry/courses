// https://www.hiredintech.com/classrooms/algorithm-design/lesson/19/task/31
const { expect } = require('chai');

function checkLinesIntersection(line1, line2){
    const [start1, end1] = line1;
    const [start2, end2] = line2;
    return start2 <= end1 && end2 >= start1;
}

function calcRadarCoverage(lines){
    lines.sort(([,endA], [,endB]) => endA - endB);
    let [start, end] = lines[0];
    const result = [];
    for(let i = 1; i < lines.length; i++){
        const hasInteresction = checkLinesIntersection([start, end], lines[i]);

        if(hasInteresction){
            const [currStart, currEnd] = lines[i];
            start = Math.min(start, currStart);
            end = Math.max(end, currEnd);
        }

        if(!hasInteresction || i === lines.length - 1) {
            result.push([start, end]);
            [start, end] = lines[i];
        }
    }

    return result;
}

const borderLength = 100;
const radars = [[5, 10], [3, 25], [46, 99], [39, 40], [45, 50]];
const output = 77;

const sumLength = arr => arr.reduce((s, [start, end]) => s + (end - start), 0)
const compose = (...fns) => x => fns.reduce((v, fn) => fn(v), x);
const calcTotalCoverage = compose(calcRadarCoverage, sumLength);

expect(calcRadarCoverage(radars)).to.deep.equal([[3, 25], [39, 40], [45, 99]]);
expect(calcTotalCoverage(radars)).to.equal(output);

