// https://www.hackerrank.com/challenges/swap-nodes-algo/problem

const { expect } = require('chai');

const terminator = '-1';

function buildTree(...edges){
    const tree = {};
    let idStack = [1];
    edges.forEach((edge) => {
        const idx = idStack.shift();
        tree[idx] = edge;
        idStack = idStack.concat(edge.filter(i => i != terminator))
    });
    return tree;
}

function traverseToDepth ({tree, visit, reqDepth = 0, startId }){
    const queue = [{ id: startId, depth: 1 }];
    while(queue.length){
        const { id, depth } = queue.shift();
        const node = tree[id];
        if(depth === reqDepth) {
            visit(node);
        } else {
            node
                .filter(id => id != terminator)
                .forEach(id => queue.push({ id, depth: depth + 1 }))
        }
    }
}

function inorderTraversing({ tree, visit, id }){
    if(id == terminator) return;
    const [l, r] = tree[id];
    inorderTraversing({ tree, visit, id: l });
    visit(id);
    inorderTraversing({ tree, visit, id: r });
}

function swap(arr){
    const temp = arr[0];
    arr[0] = arr[1];
    arr[1] = temp;
}

function doSwaps(edges, depths){
    const tree = buildTree(...edges);
    return depths.map(depth => {
        traverseToDepth({ tree, visit: swap, reqDepth: depth, startId: '1' });
        const result = [];
        inorderTraversing({ tree, visit: v => result.push(v), id: '1' });
        return result.join(' ');
    });
}

const input1 = `11
2 3
4 -1
5 -1
6 -1
7 8
-1 9
-1 -1
10 11
-1 -1
-1 -1
-1 -1
2
2
4`;



const input = input1.split('\n');
const n = Number(input.shift()); 
const edges = input.slice(0, n).map(i => i.split(' '));
const swapDepths = input.slice(n + 1).map(Number);

const output1 = [
    '2 6 9 4 1 3 7 5 10 8 11',
    '2 9 6 4 1 3 7 5 11 8 10'
];

expect(doSwaps(edges, swapDepths)).to.deep.equal(output1);

