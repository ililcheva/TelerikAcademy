'use strict';

function solve(args) {
    var n = args.length,
        arrayOfPoints = [];

    for (var i = 0; i < n; i += 4) {
        arrayOfPoints.push({
            firstX: +args[i],
            firstY: +args[i + 1],
            secondX: +args[i + 2],
            secondY: +args[i + 3]
        });
    }
    var arrayOfSides = [];
    for (var i = 0; i < arrayOfPoints.length; i += 1) {
        var a = Math.abs(arrayOfPoints[i].firstX - arrayOfPoints[i].secondX),
            b = Math.abs(arrayOfPoints[i].firstY - arrayOfPoints[i].secondY);
        arrayOfSides.push(Math.sqrt(a * a + b * b));
    }



    for (var i = 0; i < 3; i += 1) {
        console.log(arrayOfSides[i].toFixed(2));
    }

    var a = arrayOfSides[0],
        b = arrayOfSides[1],
        c = arrayOfSides[2];

    if (a < b + c && b < c + a && c < b + a) {
        console.log("Triangle can be built");
    } else {
        console.log("Triangle can not be built");
    }
}



var log = [
    '7', '7', '2', '2',
    '5', '6', '2', '2',
    '95', '-14.5', '0', '-0.123'
];
solve(log);