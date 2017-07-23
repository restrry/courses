function chechIntesectionForContent(magazineContent, noteContent){
    return checkIntersectionForArrays(magazineContent.split(' '), noteContent.split(' ')) ?
        'Yes':
        'No';
}

function checkIntersectionForArrays(magazineContentArray, noteContentArray){
    const cache = Object.create(null);
    magazineContentArray.forEach(word => {
        cache[word] = (cache[word] || 0) + 1;
    })

    const isFullIntersection = noteContentArray.every(word => {
        if(!cache[word]) return false;
        cache[word] -= 1;
        return true;
    })

    return isFullIntersection;
}

const input11 = 'give me one grand today night';
const input12 = 'give one grand today';
const output1 = 'Yes';

console.assert(
    chechIntesectionForContent(input11, input12) === output1
);

const input21 = 'two times three is not four';
const input22 = 'two times two is four';
const output2 = 'No';

console.assert(
    chechIntesectionForContent(input21, input22) === output2
);
