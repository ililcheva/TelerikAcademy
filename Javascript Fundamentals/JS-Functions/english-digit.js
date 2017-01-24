'use strict';

function solve(args) {
    var initialNumber = args[0];

    function englishWord(x) {
        var initialNumber = +x,
            lastDigit = (initialNumber) % 10;
        switch (lastDigit) {
            case 1:
                lastDigit = 'one';
                break;
            case 2:
                lastDigit = 'two';
                break;
            case 3:
                lastDigit = 'three';
                break;
            case 4:
                lastDigit = 'four';
                break;
            case 5:
                lastDigit = 'five';
                break;
            case 6:
                lastDigit = 'six';
                break;
            case 7:
                lastDigit = 'seven';
                break;
            case 8:
                lastDigit = 'eight';
                break;
            case 9:
                lastDigit = 'nine';
                break;
            case 0:
                lastDigit = 'zero';
                break;
        }
        console.log(lastDigit);
    }
    englishWord(initialNumber);
}

var number = [42];
solve(number);