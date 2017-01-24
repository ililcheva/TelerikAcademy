'use strict';

function solve(args) {
    var a = +args[0],
        b = +args[1],
        c = +args[2],
        d = +args[3],
        e = +args[4];
    if (a > b && a > c && a > d && a > e) {
        console.log(a);
    } else if (b > a && b > c && b > d && b > e) {
        console.log(b);
    } else if (c > a && c > b && c > d && c > e) {
        console.log(c);
    } else if (d > a && d > b && d > c && d > e) {
        console.log(d);
    } else {
        console.log(e);
    }
}

var arr = ['-3', '-0.5', '-1.1', '-2', '-0.1'];
solve(arr);