var page = require('webpage').create()
var fs = require('fs')
page.open('http://m.booktxt.net/wapbook/595-21.html', function (status) {
    console.log("Status: " + status)
    if (status === "success") {
        var ua = page.evaluate(function () {
            var list = $('.recommend .directoryArea a').map(function() {
                return {title:$(this).text(),href: $(this).attr('href')}
            }).get()
            
            return JSON.stringify(list)
        })
        console.log(ua)
        // var list = []
        // JSON.parse(ua).forEach(function (value) {
        //     list.push({title: value.textContent, href: value.href})
        // })
        
        // fs.write('./全职法师.html', list, 'w')
    }
    phantom.exit()
})
page.onConsoleMessage = function (msg) {
    console.log(msg)
}
page.onError = function(msg, trace) {
//
//     var msgStack = ['ERROR: ' + msg];
//
//     if (trace && trace.length) {
//         msgStack.push('TRACE:');
//         trace.forEach(function(t) {
//             msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
//         });
//     }
//
//     console.error(msgStack.join('\n'));
//
};