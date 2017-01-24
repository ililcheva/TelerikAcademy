'use strict';

function solve(args) {
    function GetMax(x, y) {
        return ((x > y) ? x : y);
    }

    var array = args[0].split(' ').map(Number),
        first = array[0],
        second = array[1],
        third = array[2];

    if (GetMax(first, second) > third) {
        console.log(GetMax(first, second));
    } else {
        console.log(third);
    }
}

var arr = ['7 19 19'];
solve(arr);