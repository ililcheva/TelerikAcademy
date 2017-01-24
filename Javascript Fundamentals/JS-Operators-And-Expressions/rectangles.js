'use strict';

function solve(args) {
    var width = args[0],
        height = args[1];
    var area = (width * height);
    var perimeter = width * 2 + height * 2;
    console.log(area.toFixed(2), perimeter.toFixed(2));
}

var arr = ["3.5", "4.5"];
solve(arr);