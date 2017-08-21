function sum(x){
    return function(y){
        return typeof y === 'undefined' ? x : sum (x+y);
    }
}

console.log(sum(1)());
console.log(sum(1)(2)());
console.log(sum(1)(2)(3)());


function sum2(x){
    let acc = x;
    const temp = function(y){
        acc += y;
        return temp;
    }
    temp.toString = function (){
        return acc;
    }
    return temp;
}

console.log(sum2(1).toString())
console.log(sum2(1)(2).toString())
console.log(sum2(1)(2)(3).toString())


function sum3(x){
    let acc = x;
    function temp(y){
        if(typeof y === 'undefined') return acc;
        acc += y;
        return temp;
    }
    return temp;
}

console.log(sum3(1)())
console.log(sum3(1)(2)())
console.log(sum3(1)(2)(3)())
