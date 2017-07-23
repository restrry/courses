// https://www.hackerrank.com/challenges/ctci-making-anagrams
// calcAnagramDistance('cde', 'abc') === 4;
function calcAnagramDistance(a, b){
    var acc = {};
    Array.from(a).forEach(c => acc[c] = (acc[c] || 0) + 1);
    Array.from(b).forEach(c => acc[c] = (acc[c] || 0) - 1);

    return Object.keys(acc).reduce((sum, v) => sum + Math.abs(acc[v]), 0);
}
