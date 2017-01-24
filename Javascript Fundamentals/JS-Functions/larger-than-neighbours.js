'use strict';

function solve(args) {
    function largerThanNeighbours(position, array) {
        if ((array[position] > array[position - 1]) && (array[position] > array[position + 1])) {
            return true;
        } else {
            return false;
        }
    }
    var arrayLength = (+args[0]),
        array = args[1].split(' ').map(Number),
        counter = 0;
    for (var i = 0; i < array.length; i += 1) {
        if (largerThanNeighbours(i, array)) {
            counter += 1;
        }
    }
    console.log(counter);
}

var log = ['6', '-26 -25 -28 31 2 27'];
solve(log);