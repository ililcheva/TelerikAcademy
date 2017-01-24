'use strict';

function solve(args) {
    var input = args[0],
        objOfResults = {},
        counterForRest = 0,
        res = '';
    for (let i = 0; i < input.length; i += 1) {
        res += input[i];
        if (input[i + 1] === ':') {
            objOfResults.protocol = res;
            i += 3;
            res = '';
        } else if (input[i + 1] === '/') {
            objOfResults.server = res;
            counterForRest = i + 1;
            res = '';
            break;
        }
    }

    objOfResults.resource = input.slice(counterForRest, input.length);
    for (let o in objOfResults) {
        res += (o + ': ' + objOfResults[o] + '\n');
    }
    console.log(res.slice(0, res.length - 1));

}

var log = ['https://www.youtube.com/watch?v=34Na4j8AVgA'];
solve(log);