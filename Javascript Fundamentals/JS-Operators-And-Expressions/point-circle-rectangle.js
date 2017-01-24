'use strict';

function solve(arg) {
    var xCoord = +arg[0],
        yCoord = +arg[1],
        conditionForCircle = ((xCoord - 1) * (xCoord - 1) + (yCoord - 1) * (yCoord - 1)) <= (1.5 * 1.5),
        conditionForRectangle = ((xCoord >= -1 && xCoord <= 5) && (yCoord >= -1 && yCoord <= 1)),
        resultforCircle = conditionForCircle ? 'inside ' : 'outside ',
        resultForRectangle = conditionForRectangle ? 'inside ' : 'outside '
    console.log(resultforCircle + 'circle' + ' ' + resultForRectangle + 'rectangle');
}

var arg = ['1', '2'];
solve(arg);