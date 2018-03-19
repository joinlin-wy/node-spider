const fetch = require('./fetch')
const cheerio = require('cheerio')

fetch({
  url: 'http://fanyi.baidu.com/v2transapi',
  method: 'POST',
  headers: {
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
    'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
  },
  form: {
    from: 'en',
    to: 'zh',
    query: 'spot',
    simple_means_flag: '3',
    sign: '974725.670900',
    token: '0d4218cc4677aab6fd309a08aa9ed309',
  }
}).then(function(data){
  console.log(arguments)
  console.log(data)
})