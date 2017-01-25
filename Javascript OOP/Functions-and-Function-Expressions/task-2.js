/* Task description */
/*
	Write a function that finds all the prime numbers in a range
		1) it should return the prime numbers in an array
		2) it must throw an Error if any on the range params is not convertible to `Number`
		3) it must throw an Error if any of the range params is missing
*/

function findPrimes() {
    return function solve(x, y) {
        x = (+x);
        y = (+y);
        if (isNaN(x) || isNaN(y)) {
            throw 'Error';
        }

        function isPrime(num) {
            if (num < 2) { return false; }
            for (var i = 2; i < num; i++) {
                if (num % i == 0)
                    return false;
            }
            return true;
        }

        let arrayOfPrimes = [];
        for (let i = x; i <= y; i += 1) {
            if (isPrime(i)) {
                arrayOfPrimes.push(i);
            }
        }
        return arrayOfPrimes;
    };
}

module.exports = findPrimes;