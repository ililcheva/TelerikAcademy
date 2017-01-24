'use strict';

function solve(args) {
    var itemToRemove = args[0],
        array = args;

    Array.prototype.remove = function(arg) {
        for (var i = 0; i < this.length; i += 1) {
            if (this[i] === arg) {
                this.splice(i, 1)
                i -= 1;
            }
        }
    };
    array.remove(itemToRemove);
    Array.prototype.print = function() {
        var print = this[0];
        for (var i = 1; i < this.length; i += 1) {
            print += ('\n' + this[i]);
        }
        console.log(print);
    };
    array.print();
}

var log = ['1', '2', '3', '2', '1', '2', '3', '2'];
solve(log);