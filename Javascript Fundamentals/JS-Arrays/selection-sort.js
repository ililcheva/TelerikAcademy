'use strict';

function solve(args) {
    var arrayLength = +args[0],
        array = [],
        sortedArray = [];

    for (let i = 1; i <= arrayLength; i += 1) {
        array.push(+args[i]);
    }

    while (arrayLength) {
        let x = Math.min.apply(null, array);
        sortedArray.push(x);
        array.splice(array.indexOf(x), 1);
        arrayLength -= 1;
    }

    function print(array) {
        let print = array[0];
        for (let i = 1; i < array.length; i += 1) {
            print += ('\n' + array[i]);
        }
        return print;
    }

    let printed = print(sortedArray);
    console.log(printed);
}

var log = ['10', '36', '10', '1', '34', '28', '38', '31', '27', '30', '20'];
solve(log);