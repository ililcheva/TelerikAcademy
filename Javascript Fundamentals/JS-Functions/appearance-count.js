'use strict';

function solve(args) {
    function appearanceCount(length, arr, number) {
        var counter = 0;
        for (var i = 0; i < arr.length; i += 1) {
            if (number === arr[i]) {
                counter += 1;
            }
        }
        console.log(counter);
    }
    var arrayLength = (+args[0]),
        array = args[1].split(' ').map(Number),
        number = (+args[2]);
    appearanceCount(arrayLength, array, number);
}

var log = ['8', '28 6 21 6 -7856 73 73 -56', '73'];
solve(log);