'use strict';

function solve(args) {
    var a = +args[0],
        b = +args[1],
        h = +args[2];
    var area = ((a + b) / 2) * h;
    console.log(area.toFixed(7));
}

var arr = ['0.222', '0.333', '0.555'];
solve(arr);