'use strict';

function solve(arg) {
    var xCoord = +arg[0],
        yCoord = +arg[1],
        condition = (xCoord * xCoord + yCoord * yCoord) <= 4,
        distance = (Math.abs(Math.sqrt(xCoord * xCoord + yCoord * yCoord))).toFixed(2),
        result = condition ? console.log('yes ' + distance) : console.log('no ' + distance);
}

var arg = ['0', '1'];
solve(arg);