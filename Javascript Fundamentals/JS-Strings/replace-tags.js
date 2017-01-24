'use strict';

function solve(args) {
    let regExTag = new RegExp('<a href="(.*?)">(.*?)</a>', "g");

    let newText = args[0].replace(regExTag, function(none, href, content) {

        return '[' + content + '](' + href + ')';
    });

    console.log(newText);
}

var log = ['<p>Please visit <a href="http://academy.telerik.com">our site</a> to choose a training course. Also visit <a href="www.devbg.org">our forum</a> to discuss the courses.</p>']
solve(log);