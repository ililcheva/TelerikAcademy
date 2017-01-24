'use strict';

function solve(args) {
    var arrayLength = +args[0],
        array = [];

    for (let i = 1; i <= arrayLength; i += 1) {
        array.push(+args[i]);
    }

    let sortedArray = array.sort(),
        sortedArrayLength = sortedArray.length,
        repetitionArray = [],
        resultArray = [];

    while (sortedArrayLength) {
        var times = 1;
        for (let i = 0; i < sortedArrayLength - 1; i += 1) {
            if (sortedArray[i] === sortedArray[i + 1]) {
                times += 1;
            } else { break; }
        }
        resultArray.push(sortedArray[0]);
        repetitionArray.push(times);
        sortedArray.splice(0, times);
        sortedArrayLength -= times;
    }

    let max = Math.max.apply(null, repetitionArray),
        index = repetitionArray.indexOf(max),
        number = resultArray[index];

    console.log(number + ' (' + max + ' times)');
}


var log = ['13', '4', '1', '1', '4', '2', '3', '4', '4', '1', '2', '4', '9', '3'];
solve(log);