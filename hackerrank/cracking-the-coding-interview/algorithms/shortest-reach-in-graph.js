// https://www.hackerrank.com/challenges/ctci-bfs-shortest-reach
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

function bfs(network, startId, visit){
    const queue = [{ id: startId, depth: 0 }];
    const visited = new Set();

    while(queue.length){
        const current = queue.shift();
        const { id, depth } = current;

        if(visited.has(id)) continue;
        visited.add(id);

        if(visit(current)) return current;

        const edges = Array.from(network.getAllConnectionsForId(id)).map(i => ({id: i, depth: depth + 1}));
        queue.push(...edges);
    }

    return { id: null, depth: null };
}

function getDistancesFor(nodeCount, connections, startId){
    const pathWeight = 6;
    const network = buildNetwork(nodeCount, connections);
    const paths = [];
    for(let i = 1; i <= nodeCount; i++){
        if(i === startId) continue;
        const { depth } = bfs(network, startId, ({ id, depth }) => id === i);
        paths.push(depth ? depth * pathWeight : -1);
    }

    return paths;
}

const nodeCount1 = 4;
const connections1 = [[1, 2], [1, 3]];
const startPosition1 = 1;
const output1 = [6, 6, -1];

expect(getDistancesFor(nodeCount1, connections1, startPosition1)).to.deep.equal(output1);

const nodeCount2 = 3;
const connections2 = [[2, 3]];
const startPosition2 = 2;
const output2 = [-1, 6];

expect(getDistancesFor(nodeCount2, connections2, startPosition2)).to.deep.equal(output2);
