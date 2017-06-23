// https://stepik.org/lesson/Очереди-с-приоритетами-13240/step/8
process.stdin.setEncoding('utf8');
var chunks = '';

process.stdin.on('data', function(data) {
  chunks += data;
});

process.stdin.on('end', () => {
    // input format: num of operations, [<Insert X | Extract Max>]
    const commands = chunks
        .split('\n')
        .filter(Boolean)
        .slice(1)
        .map(parseCmd)

    const maxHeap = new Heap((a, b) => b > a);

    const results = processCommandsOverHeap(commands, maxHeap);

    var output = results.join('\n');

    process.stdout.write(output);
});

function parseCmd(cmd){
    switch(true){
        case /insert/i.test(cmd):
            const [_, value] = cmd.split(' ');
            return ['insert', parseInt(value, 10)];

        case /extract/i.test(cmd):
            return ['extract'];

        default:
            throw new Error(`Unknown command: ${cmd}`);
    }
}

function processCommandsOverHeap(commands, heap){
    const maxs = [];

    commands.forEach(([cmd, value]) => {
        if(cmd === 'insert'){
            heap.insert(value)
        } else {
            maxs.push(heap.extractMax());
        }
    })

    return maxs;
}

class Heap {
    constructor(){
        this.list = [];
    }

    extractMax(){
        const max = this.list.shift();
        this.list.unshift(this.list.pop())
        this._siftDown(0);
        return max;
    }

    getSize() {
        return this.list.length;
    }

    insert(p){
        var idx = this.list.push(p) - 1;
        this._siftUp(idx);
    }

    _swap(idx1, idx2){
        const temp = this.list[idx1];
        this.list[idx1] = this.list[idx2];
        this.list[idx2] = temp;
    }

    _siftUp(idx){
        while(idx){
            const parentIdx = Math.floor((idx - 1)/ 2);
            if(this.list[idx] <= this.list[parentIdx]) break;
            this._swap(idx, parentIdx);
            idx = parentIdx;
        }
    }

    _siftDown(idx){
        while(true){
            let largestChildIdx = idx;

            const leftChildIdx = 2 * idx + 1;
            const rightChildIdx = 2 * idx + 2;

            if(
                leftChildIdx < this.getSize() &&
                this.list[leftChildIdx] > this.list[largestChildIdx]
            ){
                largestChildIdx = leftChildIdx;
            }

            if(
                rightChildIdx < this.getSize() &&
                this.list[rightChildIdx] > this.list[largestChildIdx]
            ){
                largestChildIdx = rightChildIdx;
            }

            if(largestChildIdx === idx) break;

            this._swap(idx, largestChildIdx);
            idx = largestChildIdx;
        }
    }
}
