'use strict';

function solve(args) {
    var firstArray = args[0].split(''),
        secondArray = args[1].split(''),
        value = 0;

    function returnShorter(x, y) {
        return Math.min(x.length, y.length);
    }

    let limit = returnShorter(firstArray, secondArray);

    for (let i = 0; i < limit; i += 1) {
        if (firstArray[i] < secondArray[i]) {
            value = '<';
            break;
        } else if (firstArray[i] > secondArray[i]) {
            value = '>';
            break;
        } else if (firstArray[i] === secondArray[i]) {
            if (firstArray.length === secondArray.length) {
                value = '=';
            } else {
                if (firstArray.length > secondArray.length) {
                    value = '>';
                } else {
                    value = '<';
                }
            }
        }
    }
    console.log(value);
}


var log = ['food', 'food'];
solve(log);