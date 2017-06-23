// https://stepik.org/lesson/Введение-13238/step/10
process.stdin.setEncoding('utf8');
var chunks = '';

process.stdin.on('data', function(data) {
    chunks += data;
});

process.stdin.on('end', () => {
    const [[n, volume], ...input] = chunks
        .split('\n')
        .filter(Boolean)
        .map(i => i.split(' ').map(Number));

    const maxSum = calcMaxItemsSumFor(input, volume);
    const output = maxSum.toFixed(3);

    process.stdout.write(output);
});

function calcMaxItemsSumFor(itemsArray = [], volume){
    const items = itemsArray
        .filter(([cost, volume]) => cost && volume)
        .map(([cost, volume]) => ({ volume, cost, unitCost: cost/volume }))
        // here we could add also sorting by volume if cost per unit is equal for both items
        .sort(function sortByDescUnitCost(item1, item2){
            return item2.unitCost - item1.unitCost;
        });

    if(!volume || !items.length){
        return 0;
    }

    let volumeLeft = volume;
    let activeItemIdx = 0;
    const usedItems = [];

    const allItemsAreUsed = idx => idx === items.length;

    while(volumeLeft && !allItemsAreUsed(activeItemIdx)){
        const item = items[activeItemIdx];

        if(item.volume >= volumeLeft){
            usedItems.push(Object.assign({}, item, { volume: volumeLeft }));
            break;
        } else {
            usedItems.push(item);
            volumeLeft -= item.volume;
        }
        activeItemIdx++;
    }

    const sum = usedItems.reduce((sum, item) => sum + item.volume * item.unitCost, 0);
    return sum;
}
