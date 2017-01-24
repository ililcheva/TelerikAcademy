'use strict';

function solve(args) {
    function firstLargerThanNeighbours(array) {
        var position = 0;
        for (var i = 0; i < array.length; i += 1) {
            if ((array[i] > array[i - 1]) && (array[i] > array[i + 1])) {
                position = i;
                break;
            }
        }
        if (!position) {
            position = -1;
        }
        console.log(position);
    }
    var arrayLength = (+args[0]),
        array = args[1].split(' ').map(Number);
    firstLargerThanNeighbours(array);
}

var log = ['6', '-26 -25 -28 31 2 27'];
solve(log);