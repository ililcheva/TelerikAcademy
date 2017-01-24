'use strict';

function solve(args) {
    var a = +args[0],
        b = +args[1],
        c = +args[2];
    if ((a * b * c) === 0) {
        console.log('0');
    } else if ((a * b * c) > 0) {
        console.log('+');
    } else {
        console.log('-');
    }
}

var arr = ['-1', '-0.5', '-5.1'];
solve(arr);