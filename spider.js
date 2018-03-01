/**
 * joinlin 创建于 2017/9/29.
 */
var request = require("request")
var q = require("q")
var fs = require("fs")
var iconv = require('iconv-lite')
var cheerio = require('cheerio')


function req(url) {
    var deferred = q.defer()
    request({url: url, encoding: null}, function (error, res, body) {
        if (error || res.statusCode != 200) {
            deferred.reject(error)
        } else {
            deferred.resolve(body)
        }
    })
    return deferred.promise
}

function operate(html) {
    html = iconv.decode(html, 'utf-8')
    // var $ = cheerio.load(html)
    // var list = $('.recommend .directoryArea a').map(function() {
    //    return {title:$(this).text(),href: $(this).attr('href')}
    // }).get()
    fs.writeFile('./response.txt', JSON.stringify(html))
    console.log()
}

function runTask() {
    req('http://123.56.220.103:9880/GwPortal/searchByKey?key=c&versionname=91_1101_20180123_001_gw&type=all')
      .then(operate)
      .fail(function (err) {
          console.log(err)
      })
}

runTask()