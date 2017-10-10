/**
 * joinlin 创建于 2017/9/30.
 */
const request = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const fs = require('fs');
const q = require('q');
const deferred = q.defer();
function req(url,coding) {
  code=coding||"utf8";
  request.get({url:url,encoding:null},function (error,response,body) {
    if (error || response.statusCode!=200) {
      deferred.reject(err);
    } else {
      let content=body;
      if(coding!==null){
        content=iconv.decode(body,code);
      }
      
      deferred.resolve(content,response);
    }
  });
  return deferred.promise;
}
let $=null;
let widgetList = ['civilnews', 'InternationalNews', 'FinanceNews', 'EnterNews', 'SportNews', 'AutoNews', 'HouseNews', 'InternetNews', 'InternetPlusNews', 'TechNews', 'EduNews', 'GameNews', 'DiscoveryNews', 'HealthNews', 'LadyNews', 'SocialNews', 'MilitaryNews', 'PicWall'];
let renderWidget = (widgetName,fun) => {
  request.get({
    url: 'http://news.baidu.com/widget?id='+widgetName
  },function (err,res) {
    if(err){
      console.log(err)
    }else {
      fun(res)
    }
  });
};
for(let widgetName in widgetList){
  renderWidget(widgetList[widgetName],function (res) {
    $=cheerio.load(res.body);
    let json=[];
    $("a").each(function(i, e) {
      let srcUrl = $(e).attr("src");
      let text = $(e).html();
      let href = $(e).attr("href");
      json.push({'img':srcUrl,'text':text,'toUrl':href})
    });
    fs.writeFile("data/news.json",JSON.stringify(json),function (err) {
      if(err){
        console.error(err)
      }else {
        console.log("done")
      }
    })
  })
}
