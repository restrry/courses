// https://www.hackerrank.com/challenges/binary-search-tree-lowest-common-ancestor

function findLCAonBST(root, n1, n2){
    if(root === null)                           return null;
    if(root.data === n1 || root.data === n2)    return root;

    const leftLCA = findLCAonBST(root.left, n1, n2);
    const rightLCA = findLCAonBST(root.right, n1, n2);

    if(leftLCA && rightLCA)                     return root;
    if(leftLCA)                                 return leftLCA;
                                                return rightLCA;
}

const tree1 = {
    data: 4,
    left: {
        data: 2,
        left: {
            data: 1,
            left: null,
            right: null
        },
        right: {
            data: 3,
            left: null,
            right: null
        }
    },
    right: {
        data: 7,
        left: {
            data: 6,
            left: null,
            right: null
        },
        right: null
    }
}

console.log(
    findLCAonBST(tree1, 1, 3).data === 2
);

console.log(
    findLCAonBST(tree1, 1, 6).data === 4
);


console.log(
    findLCAonBST(tree1, 4, 6).data === 4
);
