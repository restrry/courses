const last = arr => arr[arr.length - 1];
const toArray = iterable => Array.from(iterable);
const flow = (...fns) => x => fns.reduce((x, fn) => fn(x), x);

function findCoinCombinationsFor(value, coins){
    const combs = Array.from({length: value + 1}, () => new Set());
    for(let c = 0; c < coins.length; c++){
        for(let v = 1; v < combs.length; v++){
            if(v < coins[c]) continue;

            var quotient = Math.floor(v/coins[c]);
            var remainder = v % coins[c];

            if(remainder === 0){
                combs[v].add(Array(quotient).fill(coins[c]).join('.'));
            }

            combs[v - coins[c]].forEach(lessValueComb =>
                combs[v].add(`${coins[c]}.${lessValueComb}`)
            );
        }
    }

    return flow(last, toArray)(combs);
}


function calcCoinCombinationsFor(value, coins){
    const values = Array(value + 1).fill(0);
    values[0] = 1; // combiation to get 0 to simplify case when coin[c] === values[v]
    // or use instead: if(v === coins[c]) { values[v] += 1; }
    for(let c = 0; c < coins.length; c++){
        for(let v = 1; v < values.length; v++){
            if(coins[c] > v) continue;
            values[v] = values[v] + values[v - coins[c]];
        }
    }

    return last(values);
}

console.assert(
    calcCoinCombinationsFor(
        4,
        [1, 2, 3]
    ) === 4
);

console.assert(
    calcCoinCombinationsFor(
        10,
        [2, 5, 3, 6]
    ) === 5
);

console.assert(
    findCoinCombinationsFor(
        10,
        [2, 5, 3, 6]
    ).length === 5
);


console.log(
    findCoinCombinationsFor(
        10,
        [2, 5, 3, 6]
    )
);
