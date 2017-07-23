// https://www.hackerrank.com/challenges/sparse-arrays/problem
function buildDict(words){
    const dict = Object.create(null);
    words.forEach(w => {
        if(!dict[w]) {
            dict[w] = 0;
        }
        dict[w] += 1;
    });

    return dict;
}

function getCounts(words, queries){
    const dict = buildDict(words);
    return queries.map(q => dict[q] || 0);
}

const words1 = [
    'aba',
    'baba',
    'aba',
    'xzxb',
];

const queries1 = [
    'aba',
    'xzxb',
    'ab',
];

getCounts(words1, queries1); // ?

