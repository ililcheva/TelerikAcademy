'use strict';

function solve(arg) {
    var condition = (((+arg) % 5 === 0) && (((+arg) % 7) === 0));
    var result = condition ? 'true' : 'false';
    console.log(result + ' ' + arg);
}

var arg = 140;
solve(arg);