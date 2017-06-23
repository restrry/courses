// https://stepik.org/lesson/Введение-13238/step/11
process.stdin.setEncoding('utf8');
var chunks = '';

process.stdin.on('data', function(data) {
    chunks += data;
});

process.stdin.on('end', () => {
    const n = Number(chunks);
    const naturalArray = calcMaxNaturalSet(n);
    const output = naturalArray.length + '\n' + naturalArray.join(' ');
    process.stdout.write(output);
});

function calcMaxNaturalSet(leftover){
    var result = [];
    var currentNaturalNumber = 1;

    for(;;){
        if(leftover - currentNaturalNumber > currentNaturalNumber){
            result.push(currentNaturalNumber);
            leftover -= currentNaturalNumber;
            currentNaturalNumber += 1;
        } else {
            result.push(leftover);
            break;
        }
    }

    return result;
}
