'use strict';

function solve(arg) {
    var number = arg[0],
        thirdDigit = ((number / 100) % 10) | 0,
        condition = thirdDigit === 7,
        result = condition ? console.log('true') : console.log('false ' + thirdDigit);
}

var arg = ["5"];
solve(arg);