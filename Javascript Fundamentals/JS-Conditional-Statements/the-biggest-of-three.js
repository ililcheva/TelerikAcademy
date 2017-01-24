'use strict';

function solve(args) {
    var a = +args[0],
        b = +args[1],
        c = +args[2];
    if (a > b && a > c) {
        console.log(a);
    } else if (b > a && b > c) {
        console.log(b);
    } else {
        console.log(c);
    }
}

var arr = ['0', '-2.5', '5'];
solve(arr);