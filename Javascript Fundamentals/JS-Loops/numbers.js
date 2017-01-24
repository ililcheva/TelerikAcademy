'use strict';

function solve(args) {
    var number = +args[0],
        finalString = '',
        counter = 1;
    while (counter <= number) {
        if (counter === number) {
            finalString += counter;
            break;
        }
        finalString += (counter + ' ');
        counter += 1;
    }
    console.log(finalString);
}

var arr = ["11"];
solve(arr);