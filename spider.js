const fetch = require('./fetch');
const fs = require('fs');
const cheerio = require('cheerio');

function getContent(url) {
    return fetch({
        url,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36'
        },
        method: 'get',
        encoding: 'gb2312'
    });
}
async function getLink(url){
    url = 'http://www.ygdy8.net/'+ url;
    let data = await getContent(url);
    let $ = cheerio.load(data);
    
    return $('#Zoom table a').eq(0).attr('href');
}
getContent('http://www.ygdy8.net/html/gndy/dyzz/list_23_1.html').then(async function (data) {
    let $ = cheerio.load(data);
    let list = $('a.ulink');
    let dataList = [];
    for(let i = 0;i < list.length; i++){
        let data = await getLink(list.attr('href'));
        dataList.push({
            name: list.eq(i).text(),
            link: data
        });
    }
    console.log(dataList);
    fs.writeFile('./data/movie.json', JSON.stringify(dataList), (err) => {
        console.log(err || '写入完成');
    });
}, (e) => {
    console.error(e);
});