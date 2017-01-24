'use strict';

function solve(args) {
    var number = +args[0],
        finalString = '',
        counter = 0,
        maxCounter = 2 * number - 1;
    while (number <= maxCounter) {
        var nestedCounter = counter + 1;
        while (nestedCounter <= number) {
            if (nestedCounter === number) {
                finalString += nestedCounter;
                break;
            }
            finalString += (nestedCounter + ' ');
            nestedCounter += 1;
        }
        console.log(finalString);
        finalString = '';
        counter += 1;
        number += 1;
    }
}

var arr = ["2"];
solve(arr);