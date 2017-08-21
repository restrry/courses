function repeatArrayElements(arr, times = 2){
    const temp = new Array(times);
    return arr.reduce((acc, v) => {
        acc.push(...temp.fill(v));
        return acc;
    }, [])
}


repeatArrayElements([1, 2, 3], 3) //?

function interpose(arr, elem){
    return arr.length > 1 ?
        arr.reduce((acc, v) => {
            acc.push(v, elem);
            return acc;
        }, []) :
        arr;

}

interpose([1, 2, 3], 0); //?
interpose([1], 0); //?
interpose([], 0); //?


function repeat(v, times){
    return new Array(times).fill(v);
}

repeat(0, 5); //?


function splitAt(arr, pos){
    return [
        arr.slice(0, pos),
        arr.slice(pos)
    ];
}

splitAt([10, 20, 30, 40, 50, 60], 4);// ?

function swap(arr, i, j){
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function getRandomInRange(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(arr){
    let len = arr.length - 1;
    let n = len;
    let i, j;
    while(n--){
        i = getRandomInRange(0, len);
        j = getRandomInRange(0, len);
        swap(arr, i, j);
    }
    return arr;
}

shuffle([10, 20, 30, 40, 50]) //?


function curry(fn, { arity = fn.length, right = false } = {}){
    return function temp(){
        if(arguments.length < arity){
            return temp.bind(null, ...arguments);
        }
        const args = Array.from(arguments).slice(0, arity);
        if(right) args.reverse();
        return fn.apply(null, args);
    }
}

var curried = curry(function(a, b, c){
    return a + b + c;
});

curried(1)(2)(3) // ?

function curry2(fn){
    return curry(fn, { arity: 2 });
}

var curried2 = curry2(function(a, b){
    return a + b;
});

curried2(1)(2) // ?

function curryRight(fn, n){
    return curry(fn, { right: true });
}

function divide (a, b) {
    return a / b;
}

var curriedDivide = curryRight(divide);
curriedDivide(1)(2) //?
curriedDivide(2)(1) //?


function curryRight2(fn){
    return curry(fn, { right: true, arity: 2 });
}

function concat () {
    var str = "";

    for (var i = 0; i < arguments.length; i++) {
        str = str + arguments[i];
    }
    
    return str;
}


var curried = curryRight2(concat); //?

curried("a"); //?

curried("a")("b"); //?

function findAll(arr, elem){
    const result = [];
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === elem){
            result.push(i);
        }
    }
    return result;
}

function fillHoles(toFill, values, stub = '_'){
    const result = Array(toFill.length);
    for(let i = 0; i < toFill.length; i++){
        result[i] = toFill[i] === stub ? values.shift() : toFill[i];
    }
    return result;
}

function count(arr, elem){
    return arr.reduce((s, v) => s + Number(v === elem), 0);
}

function fix(fn, ...args){
    const holes = count(args, '_'); //?
    return function temp (){
        const args2 = Array.from(arguments);
        if(args2.length < holes){
            return temp.bind(null, ...args2);
        }
        const resultArray = fillHoles(args, args2);
        return fn.apply(null, resultArray);
    }
}

function add3 (a, b, c) {
    return a + b + c;
}

var fixedFirstAndLast = fix(add3, 1, '_', 3);
// => function

fixedFirstAndLast(2); //?
// => 6

fixedFirstAndLast(10); //?
// => 14

var fixedTwoLast = fix(add3, 1, '_', '_');

fixedTwoLast(5)(7) // ?
