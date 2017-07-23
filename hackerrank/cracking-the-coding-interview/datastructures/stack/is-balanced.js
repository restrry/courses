const last = arr => arr[arr.length - 1];

function Stack () {
    const stack = [];
    return {
        isEmpty(){
            return stack.length === 0;
        },
        push(item){
            return stack.push(item);
        },
        pop(){
            return stack.pop();
        },
        peek(){
            return last(stack);
        }
    }
}

const bracePairs = {
    '{': '}',
    '(': ')',
    '[': ']'
}
const openingBraces = Object.keys(bracePairs);
const closingBraces = Object.values(bracePairs);

const isOpeningBrace = c => openingBraces.includes(c);
const isClosingBrace = c => closingBraces.includes(c);

function isBalanced(str){
    const stack = new Stack();
    for(let i = 0; i < str.length; i++){
        const char = str.charAt(i);

        if(isOpeningBrace(char)){
            stack.push(char)
        } else if (isClosingBrace(char)){
            if(bracePairs[stack.peek()] === char){
                stack.pop();
            } else {
                return false;
            }
        }
    }

    return stack.isEmpty();
}

console.assert(
    isBalanced('}{')                       === false
);

console.assert(
    isBalanced('{{}')                      === false
)

console.assert(
    isBalanced('{}{}')                     === true
);

console.assert(
    isBalanced('foo { bar { baz } boo }')  === true
);

console.assert(
    isBalanced('foo { bar { baz }')        === false
);

console.assert(
    isBalanced('foo { bar } }')            === false
);

console.assert(
    isBalanced('(foo { bar (baz) [boo] })')=== true
);

console.assert(
    isBalanced('foo { bar { baz }')        === false
);

console.assert(
    isBalanced('foo { (bar [baz] } )')     === false
);
