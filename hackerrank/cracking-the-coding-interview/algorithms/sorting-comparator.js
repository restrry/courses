function sortBy(fields){
    const [current, ...others] = fields;
    return function(a, b){
        const result = current.fn(a[current.key], b[current.key]);
        if(result === 0 && others.length){
            return sortBy(others)(a, b)
        }

        return result;
    }
}

const input1 = [{
    name: 'amy',
    scores: 100
}, {
    name: 'david',
    scores: 100
}, {
    name: 'heraldo',
    scores: 50
}, {
    name: 'aakansha',
    scores: 75
}, {
    name: 'aleksa',
    scores: 150
},{
    name: 'bon',
    scores: 10
},{
    name: 'abon',
    scores: 10
}];

const sortNumByAsc = (a, b) => a - b;
const sortNumByDesc = (a, b) => b - a;

const sortLex = (a, b) => {
    if(a === b) return 0;
    if(a > b) return 1;
    return -1;
}

const mySorting = sortBy([{
    key: 'scores',
    fn: sortNumByDesc
}, {
    key: 'name',
    fn: sortLex
}]);
