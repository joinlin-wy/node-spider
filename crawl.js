const fetch = require('./fetch')
const cheerio = require('cheerio')
const fs = require('fs')
fetch({
    url: 'https://www.hujiang.com/ciku/zuixinkaoyanyingyucihui/'
}).then((data) => {
    var $ = cheerio.load(data)
    var list = $('.sp-lexicon-rank-module ul.sp-rank-content li').map(function () {
        return {
            word: $(this).find('a').text(),
            explanation: $(this).find('span').text()
        }
    }).get()
    fs.writeFile('data/wordlist.json', JSON.stringify(list), (error) => {
        if(error) console.log(error)
    })
}, (error) => {
    console.log(error)
})