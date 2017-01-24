'use strict';

function solve(args) {
    var arrayLength = +args[0],
        array = [],
        sequenceArray = [],
        counter = 1;

    for (let i = 1; i <= arrayLength; i += 1) {
        array.push(+args[i]);
    }

    function largerThan(first, second) {
        return (first < second);
    }

    for (let i = 0; i < arrayLength; i += 1) {
        if (largerThan(array[i], array[i + 1])) {
            counter += 1;
        } else {
            sequenceArray.push(counter);
            counter = 1;
        }
    }
    console.log(Math.max.apply(null, sequenceArray));
}

var log = ['8', '7', '3', '2', '3', '4', '2', '2', '4'];
solve(log);