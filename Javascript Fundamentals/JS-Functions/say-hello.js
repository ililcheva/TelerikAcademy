'use strict';

function solve(args) {
    var name = args[0];

    function sayHello(name) {
        console.log('Hello, ' + name + '!');
    }
    sayHello(name);
}

var arr = ['Stan'];
solve(arr);