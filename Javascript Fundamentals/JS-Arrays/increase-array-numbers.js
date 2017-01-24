'use strict';

function solve(args) {
    var arrayLength = args[0],
        array = [],
        print = '';

    for (var i = 0; i < arrayLength; i += 1) {
        array.push(i * 5);
        if (i === (arrayLength - 1)) {
            print += array[i];
            break;
        }
        print += (array[i] + '\n');
    }
    console.log(print);
}

var log = ['5'];
solve(log);