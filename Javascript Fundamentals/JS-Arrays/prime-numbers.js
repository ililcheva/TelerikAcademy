'use strict';

function solve(args) {
    var number = +args[0],
        isPrime;

    for (var i = number; i >= 2; i -= 1) {
        isPrime = true;
        for (var j = 2; j <= Math.sqrt(number); j += 1) {
            if (i % j === 0) {
                isPrime = false;
                continue;
            }
        }
        if (isPrime === true) {
            console.log(i);
            break;
        }
    }
}

var log = ['26'];
solve(log);