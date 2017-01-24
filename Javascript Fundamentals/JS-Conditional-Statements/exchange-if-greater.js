'use strict';

function solve(args) {
    var a = +args[0],
        b = +args[1];
    if (a > b) {
        console.log(b + ' ' + a);
    } else {
        console.log(a + ' ' + b);
    }
}

var arr = ['5.5', '4.5'];
solve(arr);