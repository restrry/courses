// https://www.hackerrank.com/challenges/torque-and-development/problem

function createMap(n) {
    return Array.from(
        {length: n + 1},
        () => new Set()
    );
}

const sum = arr => arr.reduce((s, v) => s + v, 0);

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


function traversDeep(graph, startId, visit){
    const stack = [startId];
    const visited = new Set();
    while(stack.length){
        const id = stack.pop();

        if(visited.has(id)) continue;
        visited.add(id);
        if (visit(id)) continue;

        stack.push(...graph.getAllConnectionsForId(id));
    }
}

function priceBySegments(network, citiesNumber, priceBuildigLibrary, priceRepairingRoad){
    const visited = new Set();
    const prices = [];
    for(let id = 1; id <= citiesNumber; id++){
        if(visited.has(id)) continue;
        visited.add(id);

        let price = priceBuildigLibrary;
        traversDeep(network, id, idx => {
            if(visited.has(idx)) return;
            visited.add(idx);

            price += priceRepairingRoad;
        });

        prices.push(price);
    }

    return prices;
}

function calcPrice(citiesNumber, roads, priceBuildigLibrary, priceRepairingRoad){
    if(priceBuildigLibrary <= priceRepairingRoad || roads.length === 0){
        return priceBuildigLibrary * citiesNumber;
    }

    return calcPriceBySegments(citiesNumber, roads, priceBuildigLibrary, priceRepairingRoad);
}

function calcPriceBySegments(citiesNumber, roads, priceBuildigLibrary, priceRepairingRoad){
    const roadNetwork = buildNetwork(citiesNumber, roads);
    const pricePerSegment = priceBySegments(roadNetwork, citiesNumber, priceBuildigLibrary, priceRepairingRoad); // ?
    const totalPrice = sum(pricePerSegment);

    return totalPrice;
}

const citiesNumber1 = 3;
const priceBuildigLibrary1 = 2;
const priceRepairingRoad1 = 1;

const roads1 = [
    [1, 2],
    [3, 1],
    [2, 3]
];
const output1 = 4;
console.assert(
    calcPrice(citiesNumber1, roads1, priceBuildigLibrary1, priceRepairingRoad1) === output1
);

const citiesNumber2 = 6;
const priceBuildigLibrary2 = 2;
const priceRepairingRoad2 = 5;
const roads2 = [
    [1, 3],
    [3, 4],
    [2, 4],
    [1, 2],
    [2, 3],
    [5, 6]
];
const output2 = 12;
console.assert(
    calcPrice(citiesNumber2, roads2, priceBuildigLibrary2, priceRepairingRoad2) === output2
);

const citiesNumber3 = 9;
const priceBuildigLibrary3 = 91;
const priceRepairingRoad3 = 84;
const roads3 = [
    [8, 2],
    [2, 9]
];
const output3 = 805;
console.assert(
    calcPrice(citiesNumber3, roads3, priceBuildigLibrary3, priceRepairingRoad3) === output3
);

const citiesNumber4 = 5;
const priceBuildigLibrary4 = 92;
const priceRepairingRoad4 = 23;
const roads4 = [
    [2, 1],
    [5, 3],
    [5, 1],
    [3, 4],
    [3, 1],
    [5, 4],
    [4, 1],
    [5, 2],
    [4, 2],
];

const output4 = 184;
console.assert(
    calcPrice(citiesNumber4, roads4, priceBuildigLibrary4, priceRepairingRoad4) === output4
);

const citiesNumber5 = 8;
const priceBuildigLibrary5 = 10;
const priceRepairingRoad5 = 55;
const roads5 = [
    [6, 4],
    [3, 2],
    [7, 1],
];

const output5 = 80;
console.assert(
    calcPrice(citiesNumber5, roads5, priceBuildigLibrary5, priceRepairingRoad5) === output5
);

const citiesNumber6 = 1;
const priceBuildigLibrary6 = 5;
const priceRepairingRoad6 = 3;
const roads6 = [];

const output6 = 5;
console.assert(
    calcPrice(citiesNumber6, roads6, priceBuildigLibrary6, priceRepairingRoad6) === output6
);


// function splitBySegments(network, citiesNumber){
//     const segmented = new Set();
//     const segments = [];
//     for(let i = 1; i < citiesNumber; i++){
//         const segment = [];
//         traversDeep(network, i, id => {
//             if(segmented.has(id)){
//                 return true;
//             }
//             segment.push(id);
//             segmented.add(id);
//         });

//         if(segment.length){
//             segments.push(segment);
//         }
//     }

//     return segments;
// }
