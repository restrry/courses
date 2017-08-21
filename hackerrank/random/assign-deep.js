const { expect } = require('chai');

// by definition only number and object could be values
function assignDeep(obj1, obj2){
    Object.keys(obj2).forEach(key => {
        if(obj1[key] instanceof Object && obj2[key] instanceof Object){
            obj1[key] = assignDeep(obj1[key], obj2[key]);
        } else {
            obj1[key] = obj2[key];
        }
    });

    return obj1;
}

const input11 = { a: 1 };
const input12 = {};
const output1 = { a: 1 };
expect(assignDeep(input11, input12)).to.deep.equal(output1);

const input21 = { a: 1 };
const input22 = { a: 2 };
const output2 = { a: 2 };
expect(assignDeep(input21, input22)).to.deep.equal(output2);

const input31 = { a: 1 };
const input32 = { a: { b: 2 } };
const output3 = { a: { b: 2 } };
expect(assignDeep(input31, input32)).to.deep.equal(output3);

const input41 = { a: { b: { c: 1 }}};
const input42 = { a: { b: { d: 2 }}, e: 3 };
const output4 = { a: { b: { c: 1, d: 2 }}, e: 3 };
expect(assignDeep(input41, input42)).to.deep.equal(output4);
