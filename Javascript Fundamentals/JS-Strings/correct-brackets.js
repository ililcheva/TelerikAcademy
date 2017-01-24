'use strict';

function solve(args) {
    var str = args[0].split('');

    function countCheck(arr) {
        let counterOfLeft = 0,
            counterOfRight = 0;
        for (let i = 0; i < arr.length; i += 1) {
            if (arr[i] === '(') {
                counterOfLeft += 1;
            } else if (arr[i] === ')') {
                counterOfRight += 1;
            }
        }
        if (counterOfLeft !== counterOfRight) {
            return false;
        }
        return true;
    }

    function balancedParentheses(arr) {
        let stack = [],
            open = '(',
            closed = ')';

        for (let i = 0; i < arr.length; i += 1) {
            let char = arr[i];
            if (countCheck(arr)) {
                if (open === char) {
                    stack.push(char);
                } else if (closed === char) {
                    if (open !== char) {
                        if (!stack.length) {
                            return 'Incorrect';
                        }
                        stack.pop();
                    }
                }
            }
        }
        return 'Correct';
    };
    let x = balancedParentheses(str);
    console.log(x);
}

var log = ['((a + (b * c))*(а + (b * c))'];
solve(log);