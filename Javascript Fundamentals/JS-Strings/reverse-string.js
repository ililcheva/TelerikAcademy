'use strict';

function solve(args) {
    var array = args[0].split('');
    let print = '';
    for (let i = array.length - 1; i >= 0; i -= 1) {
        print += array[i];
    }
    console.log(print);
}

var log = ['qwertytrewq'];
solve(log);