const { expect } = require('chai');

function createMap(n) {
    return Array.from(
        {length: n + 1},
        () => new Set()
    );
}

function Network(size){
    this.edges = createMap(size);
}

Network.prototype.addNode = function addNode(id1, id2){
    this.edges[id1].add(id2);
    this.edges[id2].add(id1);
    return this;
}

Network.prototype.fill = function fill(connections){
    connections.forEach(c => this.addNode(...c));
    return this;
}

Network.prototype.getAllConnectionsForId = function getAllConnectionsForId(id){
    return this.edges[id].values();
}

function buildNetwork(size, connections){
    const network = new Network(size);
    network.fill(connections);
    return network;
}

function traversBread(graph, startId, visit){
    const queue = [startId];
    const visited = new Set();
    while(queue.length){
        const id = queue.shift();

        if(visited.has(id)) continue;
        visited.add(id);
        visit(id);

        queue.push(...graph.getAllConnectionsForId(id));
    }
}

const networkSize = 7;
const connections = [
    [1, 2],
    [1, 4],
    [4, 2],
    [4, 3],
    [3, 1],
    [5, 6],
    [5, 7],
    [7, 6]
];

const network = buildNetwork(networkSize, connections);

const input1 = 2;
const output1 = [1, 3, 4];
const result1 = [];
traversBread(network, input1, id => id !== input1 && result1.push(id));
expect(result1).to.have.members(output1);

const input2 = 7;
const output2 = [5, 6];
const result2 = [];
traversBread(network, input2, id => id !== input2 && result2.push(id));
expect(result2).to.have.members(output2);
