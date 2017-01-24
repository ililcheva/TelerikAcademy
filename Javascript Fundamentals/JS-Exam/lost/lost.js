'use strict';

function solve(args) {
    const [row, col] = args[0].split(' ').map(Number);

    args.shift();
    let field = new Array(row);
    field.fill(0);
    args.forEach(function(elem, i) {
        field[i] = elem.split(' ').map(Number);
    }); // field with the numbers


    let visited = new Array(row);
    visited.fill(0);
    for (let i in visited) {
        visited[i] = new Array(col);
        visited[i].fill(0);
    } // visited field for checks

    let startRow = Math.ceil(row / 2);
    let startCol = Math.ceil(col / 2);
    let startPosition = { row: startRow - 1, col: startCol - 1 };
    visited[startPosition.row][startPosition.col] = 1;

    function isInside(r, c) {
        return (0 <= r) && (r < row) && (0 <= c) && (c < col);
    } // is inside the border

    function decbin(dec, length) {
        var out = "";
        while (length--)
            out += (dec >> length) & 1;
        return out;
    }

    while (true) {
        let direction = decbin(field[startPosition.row][startPosition.col], 4).split('').map(Number);
        let up = direction[3];
        let right = direction[2];
        let down = direction[1];
        let left = direction[0];
        if (up === 1 && !(visited[startPosition.row - 1][startPosition.col])) {
            if (!isInside(startPosition.row - 1, startPosition.col)) {
                console.log(`No rakiya, only JavaScript ${startPosition.row} ${startPosition.col}`);
                break;
            }
            startPosition.row -= 1;
        } else if (right === 1 && !(visited[startPosition.row][startPosition.col + 1])) {
            if (!isInside(startPosition.row, startPosition.col + 1)) {
                console.log(`No rakiya, only JavaScript ${startPosition.row} ${startPosition.col}`);
                break;
            }
            startPosition.col += 1;
        } else if (down === 1 && !(visited[startPosition.row + 1][startPosition.col])) {
            if (!isInside(startPosition.row + 1, startPosition.col)) {
                console.log(`No rakiya, only JavaScript ${startPosition.row} ${startPosition.col}`);
                break;
            }
            startPosition.row += 1;
        } else if (left === 1 && !(visited[startPosition.row][startPosition.col - 1])) {
            if (!isInside(startPosition.row, startPosition.col - 1)) {
                console.log(`No rakiya, only JavaScript ${startPosition.row} ${startPosition.col}`);
                break;
            }
            startPosition.col -= 1;
        } else {
            console.log(`No JavaScript, only rakiya ${startPosition.row} ${startPosition.col}`);
            break;
        }
        if (!isInside(startPosition.row - 1, startPosition.col)) {
            console.log(`No rakiya, only JavaScript ${startPosition.row} ${startPosition.col}`);
            break;
        }
        visited[startPosition.row][startPosition.col] = 1;
    }

}

solve(
    [
        '5 7',
        '9 5 3 11 9 5 3',
        '10 11 10 12 4 3 10',
        '10 10 12 7 13 6 10',
        '12 4 3 9 5 5 2',
        '13 5 4 6 13 5 6'
    ]
);


solve([
    '7 5',
    '9 3 11 9 3',
    '10 12 4 6 10',
    '12 3 13 1 6',
    '9 6 11 12 3',
    '10 9 6 13 6',
    '10 12 5 5 3',
    '12 5 5 5 6'
]);