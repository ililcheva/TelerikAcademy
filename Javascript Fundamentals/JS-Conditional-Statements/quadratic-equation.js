function solve(args) {
    var a = +args[0],
        b = +args[1],
        c = +args[2],
        discriminant = b * b - 4 * a * c,
        x1 = (((-b) - Math.sqrt(discriminant)) / (2 * a)),
        x2 = ((-b) + Math.sqrt(discriminant)) / (2 * a);
    if (discriminant > 0) {
        if (x1 < x2) {
            console.log('x1=' + x1.toFixed(2) + '; x2=' + x2.toFixed(2));
        } else {
            console.log('x1=' + x2.toFixed(2) + '; x2=' + x1.toFixed(2));
        }
    } else if (discriminant === 0) {
        console.log('x1=x2=' + x1.toFixed(2));
    } else {
        console.log('no real roots');
    }
}

var arr = ['-1', '3', '0'];
solve(arr);