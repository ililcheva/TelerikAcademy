'use strict';

function solve(args) {
    var a = +args[0],
        b = +args[1],
        c = +args[2];
    if (a > b && a > c) {
        if (b > c) {
            console.log(a + ' ' + b + ' ' + c);
        } else {
            console.log(a + ' ' + c + ' ' + b);
        }
    } else if (b > a && b > c) {
        if (a < c) {
            console.log(b + ' ' + c + ' ' + a);
        } else {
            console.log(b + ' ' + a + ' ' + c);
        }
    } else {
        if (a < b) {
            console.log(c + ' ' + b + ' ' + a);
        } else {
            console.log(c + ' ' + a + ' ' + b);
        }
    }
}

var arr = ['1', '1', '1'];
solve(arr);