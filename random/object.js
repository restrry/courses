function setPath(obj, path, value){
    const [prop, ...others] = path;
    if(!others.length) {
        obj[prop] = value;
    } else {
        if(typeof obj[prop] !== 'object'){
            obj[prop] = {};
        }
        setPath(obj[prop], others, value);
    }
}
var temp1 = {};
setPath(temp1, ['a', 'b', 'c'], 4);
temp1; //?

var temp2 = {a: {d: 5}};
setPath(temp2, ['a', 'b', 'c'], 4);
temp2; //?

function getPath(obj, path){
    const pathArr = path.split('.');
    return _getPath(obj, pathArr);
}

function _getPath(obj, path){
    const [prop, ...others] = path;
    return others.length ? _getPath(obj[prop], others) : obj[prop];
}

var countries = {
    greece: {
        athens: {
            playwright:  "Sophocles"
        }
    }
};

getPath(countries,  'greece.athens.playwright'); //?

function hasPath(obj, path){
    const pathArr = path.split('.');
    while(pathArr.length){
        const key = pathArr.shift();
        const value = obj[key];
        if(typeof value === 'undefined') return false;

        obj = value;
    }

    return true;
}

hasPath(countries,  'greece.athens.playwright'); //?
hasPath(countries,  'greece.athens.playwright1'); //?
hasPath(countries,  'greece.athens1'); //?
