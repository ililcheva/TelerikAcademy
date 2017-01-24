'use strict';

function solve(args) {
    const [N, K] = args[0].split(' ').map(Number);
    let numbers = args[1].split(' ').map(Number);


    function transform(index) {
        let leftNeighbour = index - 1,
            rightNeighbour = index + 1;
        if (index === 0) {
            leftNeighbour = N - 1;
        }
        if (index === N - 1) {
            rightNeighbour = 0;
        }
        let left = numbers[leftNeighbour],
            right = numbers[rightNeighbour];
        if (numbers[index] === 0) {
            let difference = left - right;
            return Math.abs(difference);
        } else if (numbers[index] === 1) {
            let sum = left + right;
            return sum;
        } else {
            if (numbers[index] % 2 === 0) {
                return Math.max(left, right);
            } else {
                return Math.min(left, right);
            }
        }
    }

    let sum = 0,
        array = numbers.slice();

    for (let i = 0; i < K; i += 1) {
        for (let j = 0; j < N; j += 1) {
            array[j] = transform(j);
            if (i === K - 1) {
                sum += array[j];
            }
        }
        numbers = array.slice();
    }

    console.log(sum);

}

solve(["5 1", "9 0 2 4 1"]);
solve(["10 3", "1 9 1 9 1 9 1 9 1 9"]);
solve(["10 10", "0 1 2 3 4 5 6 7 8 9"]);