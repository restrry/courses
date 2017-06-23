// https://stepik.org/lesson/Коды-Хаффмана-13239/step/6
process.stdin.setEncoding('utf8');
var chunks = '';

process.stdin.on('data', function(data) {
  chunks += data;
});

process.stdin.on('end', () => {
    // input format char number, coded string length, ...codes, coded string
    const [...codes] = chunks
        .split('\n')
        .filter(Boolean)
        .map(i => i.split(': '))
        .slice(1)

    const [codedString] = codes.pop();

    const codeToChar = codes.reduce((acc, [char, code]) => {
        acc[code] = char;
        return acc;
    }, {});

    var output = decodeHuffmanString(codedString, codeToChar);

    process.stdout.write(output);
});

function decodeHuffmanString(str, codeToChar){
    const regexpCodes = new RegExp(Object.keys(codeToChar).join('|'), 'g');

    // we can build tree, but... that's simple :)
    return str.replace(regexpCodes, substring => codeToChar[substring]);
}
