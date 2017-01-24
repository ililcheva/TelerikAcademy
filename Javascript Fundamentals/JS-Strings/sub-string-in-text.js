'use strict';

function solve(args) {
    var subString = args[0],
        regex = new RegExp(subString, 'gi'),
        string = args[1],
        res = string.match(regex);
    console.log(res.length);
}


var log = [
    'in',
    'We are living in an yellow submarine. We don\'t have anything else. inside the submarine is very tight. So we are drinking all the day. We will move out of it in 5 days.'
];
solve(log);