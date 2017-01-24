'use strict';

function solve(args) {
    var result = '',
        regex = /<.*?>/g,
        input = args,
        inputLength = input.length;
    for (let i = 0; i < inputLength; i += 1) {
        input[i] = input[i].trim();
        result += (input[i].replace(regex, '')).trim();
    }
    console.log(result);
}

var log = [
    '<html>',
    '  <head>',
    '    <title>Sample site</title>',
    '  </head>',
    '  <body>',
    '    <div>text',
    '      <div>more text</div>',
    '      and more...',
    '    </div>',
    '    in body',
    '  </body>',
    '</html>'
];
solve(log);
//Sample sitetextmore textand more...in body