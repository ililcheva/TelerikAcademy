'use strict';


function solve(arg) {
    var number = +arg[0],
        binaryNumber = (number >> 3).toString(2);
    binaryNumber = binaryNumber[binaryNumber.length - 1];
    console.log(binaryNumber);
}

var arg = ["1024"];
solve(arg);