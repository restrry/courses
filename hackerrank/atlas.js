// ----- 1. find subarray ------
const list1 = [1, 2, 3];
const list2 = [2, 3];

function findSublistIndex(arr, subArr){
    const arrStr = arr.join('');
    const subArrStr = subArr.join('');
    return arrStr.indexOf(subArrStr);
}

findSublistIndex(list1, list2); // ?

function checkInclusion(list, sublist, startIdx){
    let i = startIdx;
    let j = 0;
    while(i < list.length && j < sublist.length){
        if(list[i] !== sublist[j]) return false;
        i++;
        j++;
    }
    return true;
}

function findInclusion(list, sublist){
    const diff = list.length - sublist.length;
    for (let i = 0; i <= diff; i++) {
        if (checkInclusion(list, sublist, i)){
            return i;
        }
    }
    return -1;
}

findInclusion([1,2,3], [2,3]) // ?
findInclusion([1,2,3], [3, 2]) // ?
var z = [1,2,3, {}];
findInclusion([z, 1], [z]) // ?
var zz = null
findInclusion([zz, 1], [zz]) // ?
// ------------ 2 look and say
function _lookAndSay(n){
    const nArr = String(n);
    const result = [];
    const acc = {
        lastValue: nArr[0],
        count: 1
    };
    for (let i = 1; i < nArr.length + 1; i++){
        const v = nArr.charAt(i);
        if(v === acc.lastValue){
            acc.count += 1;
        } else {
            result.push(`${acc.count}${acc.lastValue}`);
            acc.count = 1;
            acc.lastValue = v;
        }
    }
    return result.join('');
}

function lookAndSay(start, n){
    let temp = start;
    while(n > 0){
        temp = _lookAndSay(temp);
        n--;
    }
    return temp;
}

// ------ convert to base ------------
function convertToBase(value, fromRadix, toRadix){
    return parseInt(value, fromRadix).toString(toRadix);
}

function convertFromBase10ToBase7(value){
    return convertToBase(value, 10, 7); 
}

const table = ['0', 'a', 't', 'l', 's', 'i', 'n'];

var z = parseInt(7, 10).toString(7); //?
var z = parseInt(7792875, 10).toString(7); //?

convertFromBase10ToBase7(7).split('').map(v => table[v]).join('')// ?

function convertToBase(value, fromRadix, toRadix){
    return parseInt(value, fromRadix).toString(toRadix);
}

function convertFromBase10ToBase16(value){
    return convertToBase(value, 10, 16); 
}

function createStore(length) {
    return Array.from({ length: length + 1 }, () => 0);
}

// ------------------ 4.robot ----------------
class Robot{
    constructor(limitHoriz, limitVert){
        this.loaded = false;
        this.position = 0;
        this.limitHoriz = limitHoriz;
        this.limitVert = limitVert;
    }
    pickup(){
        this.position = 0;
        this.loaded = true;
    }
    move(){
        if(this.position < this.limitHoriz){
            this.position += 1;
        }
        return true;
    }
    lower(store){
        const currentHeight = store[this.position];
        if(currentHeight < this.limitVert && this.loaded){
            store[this.position] += 1;
            this.loaded = false;
        }
        return true;
    }
}

function execComand(store, robot, cmd){
    switch(cmd){
        case 'P':
            robot.pickup(); break;
        case 'M':
            robot.move(); break;
        case 'L':
            robot.lower(store); break;
        default:
            // console.error('unknown comand');
    }
}

function _execComands(cmds){
    const horizMax = 9;
    const vertMax = 15;
    const store = createStore(horizMax);
    const robot = new Robot(horizMax, vertMax);
    cmds.forEach(cmd => execComand(store, robot, cmd));
    return store;
}

function execComands(cmds){
    const storeState = _execComands(cmds.split('')); // TODO map to hex;
    return storeState.map(v => convertFromBase10ToBase16(v)).join('').toUpperCase();
}

execComands('PMLPMMMLPMLPMML'); // ?
execComands('PMMMMMMMMMMMMMMMMML'); // ?

execComands('PLPLPLPLPLPLPLPLPLPLPLPLPLPLPLPLPLPL'); // ?
execComands('PLPLPLPLPLPLPLPLPLPL'); // ?
