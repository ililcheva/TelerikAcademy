'use strict';

function solve(args) {
    var arrayLength = +args[0],
        number = +args[arrayLength + 1],
        array = [];

    for (let i = 1; i <= arrayLength; i += 1) {
        array.push(+args[i]);
    }

    function binarySearch(array, number) {
        let arrayLength = array.length,
            start = 0,
            end = arrayLength - 1,
            middle = Math.floor((start + end) / 2);

        while (array[middle] !== number && start < end) {
            if (array[middle] < number) {
                start = middle + 1;
            } else if (array[middle] > number) {
                end = middle - 1;
            }
            middle = Math.floor((start + end) / 2);
        }

        return ((array[middle] !== number) ? -1 : middle);
    }

    let result = binarySearch(array, number);
    console.log(result);
}

var log = ['10', '1', '2', '4', '8', '16', '31', '32', '64', '77', '99', '32'];
solve(log);