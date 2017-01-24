'use strict';

function solve(args) {
    let numbers = args[0].split(' ').map(Number);

    function isPeak(index) {
        let booleanExp = numbers[index] > numbers[index + 1] && numbers[index] > numbers[index - 1];
        if (index === 0 || index === numbers.length - 1 || booleanExp) {
            return true;
        }
        return false;
    }

    let maxSumOfValleys = 0,
        sumOfValleys = 0;
    numbers.forEach(function(elem, i) {
        sumOfValleys += 1;
        if (isPeak(i)) {
            if (maxSumOfValleys < sumOfValleys) {
                maxSumOfValleys = sumOfValleys;
            }
            sumOfValleys = 0;
        }
    });
    console.log(maxSumOfValleys);
}


solve([
    "5 1 7 4 8"
]);
solve([
    "5 1 7 6 5 6 4 2 3 8"
]);