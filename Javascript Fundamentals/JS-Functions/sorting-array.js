'use strict';

function solve(args) {
    function maxElement(index, array) {
        var max = index;
        for (var i = index; i < array.length; i += 1) {
            if (array[max] < array[i]) {
                max = i;
            }
        }
        return max;
    }

    function sortArray(array) {
        var newArray = [];
        while (array.length) {
            var index = 0,
                x = maxElement(index, array);
            newArray.push(array[x]);
            array.splice(x, 1);
        }
        var reversed = newArray.reverse();
        return reversed;
    }

    var arrayLength = (+args[0]),
        array = args[1].split(' ').map(Number),
        x = sortArray(array),
        print = x[0];
    for (var i = 1; i < x.length; i += 1) {
        print += (' ' + x[i]);
    }
    console.log(print);
}

var log = ['10', '36 10 1 34 28 38 31 27 30 20'];
solve(log);