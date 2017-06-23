// https://stepik.org/lesson/Коды-Хаффмана-13239/step/5

process.stdin.setEncoding('utf8');
var chunks = '';

process.stdin.on('data', function(data) {
  chunks += data;
});

process.stdin.on('end', () => {
  const input = chunks.trim();
  if(!input) return;

const charFreq = calcCharFrequenceFor(input);
const codes = buildHuffmanCodesFor(charFreq);
const codedString = codeToHuffmanCodes(input, codes);

const output = []
    .concat(`${Object.keys(charFreq).length} ${codedString.length}`)
    .concat(Object.keys(codes).map(char => `${char}: ${codes[char]}`))
    .concat(codedString)
    .join('\n');

    process.stdout.write(output);
});

function calcCharFrequenceFor(str) {
    return Array.from(str).reduce((acc, char) => {
      acc[char] = (acc[char] || 0) + 1;
      return acc;
    }, {});
}

var Node = function({ name = '', value = 0, left = null, right = null }) {
    this.name = name;
    this.value = value;
    this.left = left;
    this.right = right;
};

function buildNodeTreeFor(obj) {
    const queue = new QueueWithPriority();
    const frequenceArray = Object.keys(obj)
      .map(char => new Node({ name: char, value: obj[char] }))
      .forEach(queue.enqueue);

    while (queue.length > 1) {
      const leftNode = queue.dequeueBy(getNodesWithMinFreq);
      const rightNode = queue.dequeueBy(getNodesWithMinFreq);
      const parentNode = buildParentNode(leftNode, rightNode);

      queue.enqueue(parentNode);
    }

    return queue.dequeueBy(f => f);
}

function buildParentNode(left, right) {
    return new Node({
        // name: //left.name + right.name,
        value: left.value + right.value,
        left,
        right
    });
}

function getNodesWithMinFreq(arr) {
    let minValue = Infinity;
    let minIndex = -1;
    arr.forEach((item, idx) => {
        if (item.value < minValue) {
            minIndex = idx;
            minValue = item.value;
        }
    });

    return minIndex;
}

function QueueWithPriority() {
    const queue = [];
    const enqueue = item => queue.push(item);
    const dequeueBy = function(fn) {
        const indexToRemove = fn(queue);
        const [itemToRemove] = queue.splice(indexToRemove, 1);
        return itemToRemove;
    };

    return {
        enqueue,
        dequeueBy,
        get length() {
            return queue.length;
        }
    };
}

function traverseDeep(node, visit) {
    var path = [];

    function walk(node, path, visit) {
        if (node === null) return;
        path.push('0');
        walk(node.left, path, visit);
        path.pop();

        visit(node, path);

        path.push('1');
        walk(node.right, path, visit);
        path.pop();
    }

    walk(node, path, visit);
}

function buildHuffmanCodesFor(freqObj) {
    var result = {};
    const tree = buildNodeTreeFor(freqObj);

    // case when only one symbol
    if(Object.keys(freqObj).length === 1) {
      Object.keys(freqObj).forEach(key => result[key] = '0');
      return result;
    }

    traverseDeep(tree, (node, path) => {
        if (node === null) {
          return;
        }

        if(node.name){
            result[node.name] = path.join('');
        }
    });

    return result;
}

function codeToHuffmanCodes(str, codes) {
    return Array.from(str).map(char => codes[char]).join('');
}
