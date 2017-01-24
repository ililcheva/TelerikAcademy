'use strict';

function solve(args) {
    var expression = args[0];
    expression = expression.replace(/\s+/g, '&nbsp;');
    console.log(expression);
}

var log = ['This text contains 4 spaces!!'];
solve(log);