'use strict';

function solve(args) {
    var arrayLength = +args[0],
        array = [],
        sequenceArray = [],
        counter = 1;

    for (let i = 1; i <= arrayLength; i += 1) {
        array.push(+args[i]);
    }

    function equal(first, second) {
        return (first === second);
    }
    for (let i = 0; i < arrayLength; i += 1) {
        if (equal(array[i], array[i + 1])) {
            counter += 1;
        } else {
            sequenceArray.push(counter);
            counter = 1;
        }
    }
    console.log(Math.max.apply(null, sequenceArray));
}

var log = ['10', '2', '1', '1', '2', '3', '3', '2', '2', '2', '1'];
solve(log);