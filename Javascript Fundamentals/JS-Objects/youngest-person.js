'use strict';

function solve(args) {
    var array = [];

    function makePerson(fname, lname, age) {
        return {
            firstName: fname,
            lastName: lname,
            age: age
        };
    }
    for (var i = 0; i < args.length; i += 3) {
        array.push(makePerson(args[i], args[i + 1], +args[i + 2]));
    }

    var youngest = array[0];

    for (var i = 0; i < array.length; i += 1) {
        if (array[i].age < youngest.age) {
            youngest = array[i];
        }
    }
    console.log(youngest.firstName + ' ' + youngest.lastName);
}

var log = [
    'Gosho', 'Petrov', '32',
    'Bay', 'Ivan', '81',
    'John', 'Doe', '42'
];
solve(log);