// function iterate(...args){
//     let i = 0;
//     return function(){
//         if(i < args.length){
//             return args[i++];
//         }
//         throw new Error('list is exhausted')
//     }
// }

const  triumvirIter = iterateOver("Ceasar", "Pompey", "Crassus");

triumvirIter(); //?
// => "Ceasar"

triumvirIter(); // ?
// => "Pompey"

triumvirIter(); //?
// => "Crassus"
triumvirIter(); //?


function* makeIterable(arr){
    let i = 0;
    while(i < arr.length){
        yield arr[i++];
    }
}

function iterateOver(...arr){
    const gen = makeIterable(arr);
    return function(){
        return gen.next().value;
    }
}

function iterateOverTree(...arr){
    const gen = makeIterableTree(arr);
    return function(){
        return gen.next().value;
    }
}

function* makeIterableTree(arr){
    let i = 0;
    while(i < arr.length){
        const value = arr[i++];
        if(Array.isArray(value)){
            yield* makeIterableTree(value);
        } else {
            yield value;
        }

    }
}

var rulers = ["Augustus", ["Constantine"], ["Leo", ["Charlemagne"]]];

var rulersIter = iterateOverTree(rulers);

rulersIter(); //?
// => "Augustus"

rulersIter(); //?
// => "Constantine"

rulersIter(); //?
// => "Leo"

rulersIter(); //?
// => "Charlemagne"
