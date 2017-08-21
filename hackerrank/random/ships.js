const stateEnum = {
    isOk: 'isOk',
    isTouched: 'isTouched',
    isSunk: 'isSunk'
}

const identity = x => x;

class Ship{
    constructor(start, end){
        this.start = start;
        this.end = end;
        // we can match hit on size, but in that way we can calculate status for every cell
        // so we can distinguish hits in one cell + we have info for visual rendering
        this.cells = start.x === end.x || start.y === end.y ?
            Ship.buildLine(start, end) :
            Ship.buildDiagonal(start, end);
    }

    static indexCell(x, y){
        return `${x}-${y}`;
    }

    static buildLine(start, end){
        const cells = {};
        for (let i = start.x; i <= end.x; i++){
            for(let j = start.y; j <= end.y; j++){
                cells[Ship.indexCell(i, j)] = false;
            }
        }

        return cells;
    }

    static buildDiagonal(start, end){
        const cells = {};
        let i = start.x;
        let j = start.y;
        while(i <= end.x && j <= end.y){
            cells[Ship.indexCell(i, j)] = false;
            i++;
            j++;
        }

        return cells;
    }

    hit({x, y}){
        const isCrossByX = this.start.x <= x && x <= this.end.x;
        const isCrossByY = this.start.y <= y && y <= this.end.y;
        if(isCrossByX && isCrossByY){
            this.cells[Ship.indexCell(x, y)] = true;
        }
    }

    getStatus(){
        const cellsState = Object.values(this.cells);
        switch(true){
            case cellsState.every(identity): return stateEnum.isSunk;
            case cellsState.some(identity) : return stateEnum.isTouched;
            default                        : return stateEnum.isOk;
        }
    }
}

function convertToCoords(str){
    const startY = 'A'.charCodeAt(0);
    return str.split(' ')
            // such splitting is okay only for num coords < 10
            .map(strCoord => strCoord.split(''))
            .map(([x, y]) => ({
                x: Number(x),
                y: y.charCodeAt(0) - startY
            }));
}

function buildShips(shipsStr){
    const ships = shipsStr.split(', ');
    return ships.map(convertToCoords).map(([start, end]) => new Ship(start, end))
}

function buildHits(hitsStr){
    return convertToCoords(hitsStr);
}

function calcStatusForShips(ships, hits){
    hits.forEach(coords => ships.forEach(ship => ship.hit(coords)));
    return ships.map(ship => ship.getStatus());
}

function run(shipStr, hitsStr){
    return calcStatusForShips(
        buildShips(shipStr),
        buildHits(hitsStr)
    );
}

console.log(
    run(
    "1A 2B, 5D 7D",
    "1A 2A 2B 4D 1B"
    )
);

console.log(
    run(
    "1B 2C, 2D 4D",
    "2B 2D 3D 4D 4A"
    )
);

console.log(
    run(
    "1A 2B, 5D 7D",
    "3A 7C 2E 4D 8C"
    )
);
