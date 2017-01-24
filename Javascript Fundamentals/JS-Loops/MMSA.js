'use strict';

function solve(args) {
    var number = +args.length,
        minNumber = +args[0],
        maxNumber = +args[0],
        sum = +0,
        avg = +0,
        counter = +0;
    while (counter < number) {
        if (args[counter] <= minNumber) {
            minNumber = (+args[counter]);
        }
        if (args[counter] >= maxNumber) {
            maxNumber = (+args[counter]);
        }
        sum += (+args[counter]);
        counter += 1;
    }
    avg = sum / number;
    console.log('min=' + minNumber.toFixed(2) + '\nmax=' + maxNumber.toFixed(2) + '\nsum=' + sum.toFixed(2) + '\navg=' + avg.toFixed(2));
}

var arr = ['2', '-1', '4'];
solve(arr);