const request = require('request')
const iconv = require('iconv-lite')

function fetch(conf) {
    var config = {}
    if(typeof conf == 'object'){
        config = conf
    }else{
        config.url = conf
    }
    return new Promise((resolve, reject) => {
        request({url: config.url, encoding: null}, function (error, res, body) {
            if (error || res.statusCode != 200) {
                console.error(`${config.url} request error,statusCode:${res.statusCode},error massage:`)
                console.log(error)
                reject(error)
            } else {
                resolve(iconv.decode(body, config.encoding || 'utf-8'))
            }
        })
    })
}
module.exports = fetch