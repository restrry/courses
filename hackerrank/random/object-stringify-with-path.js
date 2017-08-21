const { expect } = require('chai');

function stringify(obj, store = {}, path = []){
    Object.keys(obj).forEach(key => {
        const value = obj[key];
        path.push(key);
        if(value instanceof Object){
            stringify(value, store, path);
        } else {
            store[buildKey(path)] = value;
        }
        path.pop(key);
    });
    return store;
}

function buildKey(path, delimiter = '/'){
    return path.join(delimiter);
}

const input1 = {
    a: {
        b: {
            c: 1
        }
    },
    d: {
        e: 2
    },
    f: 3
}

const output1 = {
    'a/b/c': 1,
    'd/e': 2,
    'f': 3
};

expect(stringify(input1)).to.deep.equal(output1);
