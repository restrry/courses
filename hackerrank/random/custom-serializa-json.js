const { expect } = require('chai');

const input = {
    id: 1,
    type: 'human',
    person: {
        name: 'Mishka',
        age: 31,
        hobby: ['programming', 'zhamkat the zhopka']
    },
    creditCard: null
}
const isLastElement = (idx, array) => idx === (array.length - 1)

// primitives: null, string, boolean, number
// objects: object, array
function stringifyToJSON(obj){
    // check whether obj is primitive
    if(obj === null){
        return String(obj);
    }
    if(typeof obj === 'boolean'){
        return String(obj);
    }
    if(typeof obj === 'number'){
        return String(obj);
    }
    if(typeof obj === 'string'){
        return '"' + obj + '"';
    }
    // check whether obj is array
    if(Array.isArray(obj)){
        return '[' + obj.map(stringifyToJSON) + ']';
    }

    // check whether obj is object
    if(typeof obj === 'object'){
        let result = '{';
        Object.keys(obj).forEach(function(key, idx, arr){
            const value = obj[key];
            result = result + [
                '"' + key + '"',
                ':',
                stringifyToJSON(value)
            ].join('');

            if(!isLastElement(idx, arr)){
                result = result + ',';
            }
        })
        result = result + '}';
        return result;
    }

    throw new Error('unknow type' + obj);
}

const stringifiedInput = stringifyToJSON(input);
const deStringifiedInput = JSON.parse(stringifiedInput);

expect(deStringifiedInput).to.be.deep.equal(input);
