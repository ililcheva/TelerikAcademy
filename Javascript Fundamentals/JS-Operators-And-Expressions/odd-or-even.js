'use strict';

function solve(arg) {
    var condition = !((+arg) % 2);
    var oddOrEvenPrint = condition ? 'even' : 'odd';
    console.log(oddOrEvenPrint + ' ' + arg);
}

var arg = -2;
solve(arg);