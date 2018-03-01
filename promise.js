const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')

let req = url => new Promise(function (resolve, reject) {
        request(url, function (error, response, body) {
            if (error) {
                reject(error)
            }else{
                console.log('statusCode:', response && response.statusCode);
                resolve({response:response,body:body})
            }
        })
    })


// request('https://www.jianshu.com/trending/weekly?utm_medium=index-banner-s&utm_source=desktop',(error,response,body) =>{
//     console.log('statusCode:', response && response.statusCode);
//     console.log('body:', body);
// })
req('https://www.jianshu.com/trending/weekly?utm_medium=index-banner-s&utm_source=desktop').then(result =>{
    let $ = cheerio.load(result.body)
    let list = $('a.title').map(function(index, item){
        return `{"title":"${$(this).text()}","url":"https://www.jianshu.com/${$(this).attr('href')}"}`
    }).get()
    console.log(list)
    fs.writeFile('./data/jianshu.json', list.toString(), function () {
        console.log('write done')
    })
})
