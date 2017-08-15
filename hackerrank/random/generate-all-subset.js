var z = [1, 2, 3, 4];

function genereateAllSubsetFor(arr){
    const result = [];
    const size = Math.pow(2, 4);
    for(let i = 0; i < size; i++){
        result.push(generateSubsetForMask(i, arr));
    }
    return result;
}
function generateSubsetForMask(idx, arr){
    var result = [];
    var index = 0;
    while(idx){
        if(idx & 1) result.push(arr[index]);
        index++;
        idx = idx >> 1;
    }
    return result
}

genereateAllSubsetFor(z); // ?
