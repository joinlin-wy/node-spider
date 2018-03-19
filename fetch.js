const request = require('request')
const iconv = require('iconv-lite')

function fetch(config) {
    var conf = {encoding: null}
    conf.encoding = config.encoding
    config.encoding = null
    return new Promise((resolve, reject) => {
        request(config, function (error, res, body) {
            console.log('fetched url:'+config.url + ' statusCode:'+res.statusCode)
            if (error) {
                console.error(`${config.url} request error,statusCode:${res.statusCode},error massage:`)
                console.log(error)
                console.log('end')
                reject()
            } else {
                resolve(iconv.decode(body, conf.encoding || 'utf-8'))
            }
        })
    })
}
module.exports = fetch