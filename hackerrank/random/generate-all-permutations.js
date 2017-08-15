function generatePermutations(str){
    var result = [];
    getPermutations('', str, result);
    return result;
}

function getPermutations(prefix, root, cache){
    // base case when we have the whole string exhausted
    if(!root.length){
        cache.push(prefix);
        return;
    }
    for(let i = 0; i < root.length; i++){
        const char = root.charAt(i);
        // get every char and use it as prefix for generated strings without that char (from remained chars)
        // ^before -> i <- after$
        const before = root.slice(0, i);
        const after = root.slice(i + 1);
        getPermutations(prefix + char, before + after, cache);
    }
}

console.log(generatePermutations('abcd'));


function buildFreqTable(str){
    const cache = Object.create(null);
    for(let i = 0; i < str.length; i++){
        const char = str.charAt(i);
        cache[char] = (cache[char] || 0) + 1;
    }
    return cache;
}

function generatePermutationsWithoutDuplicates(str){
    var result = [];
    const freq = buildFreqTable(str);
    getPermutationsWithoutDuplicates('', str.length, result, freq);
    return result;
}

function getPermutationsWithoutDuplicates(prefix, remained, cache, freq){
    // base case when we have the whole string exhausted
    if(!remained){
        cache.push(prefix);
        return;
    }
    Object.keys(freq).forEach(char => {
        const charFreq = freq[char];
        if(charFreq){
            freq[char] -= 1;
            getPermutationsWithoutDuplicates(prefix + char, remained - 1, cache, freq);
            freq[char] = charFreq;
        }
    });
}
generatePermutationsWithoutDuplicates('abbad');

function insertParensInside(str, pos){
    return str.slice(0, pos) + '()' + str.slice(pos);
}
function generateParens(n){
    const result = new Set();
    if(n){
        const prev = generateParens(n - 1);
        prev.forEach(str => {
            result.add('()' + str);
            for(let i = 0; i < str.length; i++){
                if(str.charAt(i)){
                    result.add(insertParensInside(str, i + 1))
                }
            }
        })
    } else {
        result.add('');
    }
    return [...result];
}

generateParens(2); // ?

function _generateParensRecursive(leftN = n, rightN = n, result, cache, count){
    if(leftN < 0 || leftN > rightN) return;
    if(leftN === 0 && rightN === 0){
        result.push(cache.join(''));
    } else {
        if(leftN > 0){
            cache[count] = '(';
            _generateParensRecursive(leftN - 1, rightN, result, cache, count + 1);
        }
        if(rightN > leftN){
            cache[count] = ')';
            _generateParensRecursive(leftN, rightN - 1, result, cache, count + 1);
        }
    }
}

function generateParensRecursive(n){
    const result = [];
    const cache = [];
    _generateParensRecursive(n, n, result, cache, 0);
    return result;
}

generateParensRecursive(2); // ?
