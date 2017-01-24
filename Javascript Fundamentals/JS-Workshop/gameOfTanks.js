'use strict';

function solve(args) {
    const [row, col] = args[0].split(' ').map(Number), //field dimensions
        EMPTY_CELL = -1,
        DEBRI = '@';

    let field = new Array(row);
    field.fill(0);
    for (let i in field) {
        field[i] = new Array(col);
        field[i].fill(EMPTY_CELL);
    } //field created


    let tankPositions = [
        { row: 0, col: 0 }, //tank 0
        { row: 0, col: 1 }, //tank 1
        { row: 0, col: 2 }, //tank 2
        { row: 0, col: 3 }, //tank 3
        { row: row - 1, col: col - 1 }, //tank 4
        { row: row - 1, col: col - 2 }, //tank 5
        { row: row - 1, col: col - 3 }, //tank 6
        { row: row - 1, col: col - 4 } //tank 7
    ];

    let playerTanks = [4, 4]; //player tanks current count

    for (let i in tankPositions) {
        field[tankPositions[i].row][tankPositions[i].col] = i;
    } // tanks positioned


    args[1].split(';').forEach(function(coord) {
        let [x, y] = coord.split(' ').map(Number);
        field[x][y] = DEBRI;
    }); // debris positioned


    function moveTank(id, n, dir) {
        let deltaRow = 0,
            deltaCol = 0;
        if (dir === 'u') {
            deltaRow = -1;
        } else if (dir === 'd') {
            deltaRow = +1;
        } else if (dir === 'l') {
            deltaCol = -1;
        } else if (dir === 'r') {
            deltaCol = +1;
        } else {

        }
        let tankRow = tankPositions[id].row,
            tankCol = tankPositions[id].col;
        field[tankRow][tankCol] = EMPTY_CELL;
        while (n > 0) {
            let newPositionRow = tankRow + deltaRow,
                newPositionCol = tankCol + deltaCol;
            if (newPositionRow < 0 || newPositionRow > row - 1) {
                break;
            }
            if (newPositionCol < 0 || newPositionCol > col - 1) {
                break;
            }
            if (field[newPositionRow][newPositionCol] !== EMPTY_CELL) {
                break;
            }
            tankRow = newPositionRow;
            tankCol = newPositionCol;
            n -= 1;
        }
        tankPositions[id].row = tankRow;
        tankPositions[id].col = tankCol;
        field[tankRow][tankCol] = id;
    }

    function tankShoot(id, dir) {
        let deltaRow = 0,
            deltaCol = 0;
        if (dir === 'u') {
            deltaRow = -1;
        } else if (dir === 'd') {
            deltaRow = +1;
        } else if (dir === 'l') {
            deltaCol = -1;
        } else if (dir === 'r') {
            deltaCol = +1;
        } else {

        }
        let shotRow = tankPositions[id].row + deltaRow,
            shotCol = tankPositions[id].col + deltaCol;
        while (0 <= shotRow && shotRow < row && 0 <= shotCol && shotCol < col) {
            if (field[shotRow][shotCol] === EMPTY_CELL) {
                shotRow += deltaRow;
                shotCol += deltaCol;
            } else if (field[shotRow][shotCol] === DEBRI) {
                field[shotRow][shotCol] = EMPTY_CELL;
                break;
            } else {
                const deadTankId = field[shotRow][shotCol];
                field[shotRow][shotCol] = EMPTY_CELL;
                console.log(`Tank ${deadTankId} is gg`);
                const playerID = deadTankId < 4 ? 0 : 1;
                playerTanks[playerID] -= 1;
                if (playerTanks[playerID] === 0) {
                    const loserName = ['Koceto', 'Cuki'][playerID];
                    console.log(`${loserName} is gg`);
                }
                break;
            }
        }
    }

    const N = +args[2];
    args.shift();
    args.shift();
    args.shift();
    for (let i = 0; i < N; i += 1) {
        let currentCommand = args[i].split(' ');
        if (currentCommand[0] === 'mv') {
            //moveTank
            moveTank(+currentCommand[1], +currentCommand[2], currentCommand[3]);
        } else if (currentCommand[0] === 'x') {
            //tankShoot
            tankShoot(+currentCommand[1], currentCommand[2]);
        } else {

        }
    }
}


solve([
    '10 5',
    '1 0;1 1;1 2;1 3;1 4;3 1;3 3;4 0;4 2;4 4',
    '43',
    'mv 6 5 r',
    'mv 0 6 d',
    'x 0 d',
    'x 0 d',
    'x 6 u',
    'x 6 u',
    'x 6 u',
    'x 6 u',
    'x 6 u',
    'x 7 u',
    'x 7 u',
    'x 7 u',
    'x 7 u',
    'x 7 u',
    'x 3 d',
    'x 3 d',
    'x 3 d',
    'x 3 d',
    'x 3 d',
    'x 4 u',
    'x 4 u',
    'x 4 u',
    'x 4 u',
    'x 4 u',
    'x 0 r',
    'mv 0 6 d',
    'mv 0 9 r',
    'x 0 d',
    'mv 0 1 l',
    'x 0 d',
    'mv 0 1 l',
    'x 0 d',
    'mv 0 1 l',
    'x 0 d',
    'mv 0 1 l',
    'x 0 d',
    'mv 0 1 l',
    'x 0 d',
    'mv 0 1 l',
    'x 0 d',
    'mv 0 1 l',
    'x 0 d',
    'mv 0 1 l',
    'x 0 d'
]);