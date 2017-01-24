'use strict';

function solve(args) {
    let numbers = args[0].split(' ').map(Number);

    function isPeak(index) {
        if (numbers[index] > numbers[index + 1] && numbers[index] > numbers[index - 1]) {
            return true;
        }
        return false;
    }

    let pocketsSum = 0;
    numbers.forEach(function(elem, ind) {
        if (isPeak(ind) && isPeak(ind + 2)) {
            pocketsSum += numbers[ind + 1];
        }
    });
    console.log(pocketsSum);
}

solve([
    "53 20 1 30 2 40 3 10 1"
]);
solve([
    "53 20 1 30 30 2 40 3 10 1"
]);