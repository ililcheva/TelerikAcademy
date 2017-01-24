'use strict';

function solve(args) {
    const N = +args[0];
    let numbers = [];
    args.shift();
    args.forEach(function(elem, i) {
        numbers.push(+args[i]);
    });
    //for (let i = 0; i < N; i += 1) {
    //    args[i] = +args[i];
    //}
    let result = 0;
    for (let i = 0; i < N; i += 1) {
        if ((numbers[i] % 2) !== 0) {
            if (i === 0) {
                result = numbers[0];
            } else {
                result *= numbers[i];
            }
        } else if ((numbers[i] % 2) === 0) {
            if (i === 0) {
                result = numbers[0];
            } else {
                result += numbers[i];
            }
            i += 1;
        } else {
            //should not happen
        }
        result %= Math.pow(2, 10);
    }
    console.log(result);

}

solve([
    '10',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0'
]);

solve([
    '9',
    '9',
    '9',
    '9',
    '9',
    '9',
    '9',
    '9',
    '9',
    '9'
]);