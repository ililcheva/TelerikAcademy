'use strict';

function solve(args) {
    var number = args[0],
        numberLength = number.length,
        sliceNumber = -1,
        power = 1,
        sum = 0;

    while (numberLength) {
        var currentDigit = number.slice(sliceNumber);
        if (currentDigit === 'A' || currentDigit === 'B' || currentDigit === 'C' || currentDigit === 'D' || currentDigit === 'E' || currentDigit === 'F') {
            sum += parseInt(currentDigit, 16) * power;
        } else {
            sum += (parseInt(currentDigit) * power);
        }
        power *= 16;
        number = number.slice(0, sliceNumber);
        numberLength -= 1;
    }
    console.log(sum);

}

var arr = ['FE'];
solve(arr);