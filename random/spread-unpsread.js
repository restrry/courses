function spread(fn){
    return function(args){
        return fn.apply(null, args);
    };
}

function unspread(fn){
    return function(){
        return fn.call(null, Array.from(arguments));
    };
}

const listTwoNames = (a, b) => a.name + " & " + b.name;

spread(listTwoNames)([{ name: "Zeno" }, { name: "Parmenides"}]); // => "Zeno & Parmenides"

