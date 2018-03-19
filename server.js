/**
 * joinlin 创建于 2017/10/12.
 */
const express = require("express");
const fs = require("fs");
const webSocket = require("./webSocket");
webSocket.serverStart();
const cheerio = require("cheerio");
//multer API https://www.npmjs.com/package/multer
const multer = require("multer");
const app = express();
app.use(express.static('dist'));
app.use('/data', express.static('data'));
let nowFileName = ''
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'data/uploads')
  },
  filename: function (req, file, cb) {
      nowFileName= file.originalname
    cb(null, file.originalname)
  }
});

var upload = multer({ storage: storage ,limits:{fileSize:100000000}}).single('file');//"file"是文件的name属性值
app.post('/upload',function (req,res) {
  upload(req, res, function (err) {
    if (err) {
      res.send(err.code);
      return
    }
      require('./baidu-convertPicToText'). getAccessToken(function (result) {
          require('./baidu-convertPicToText').recognize('data/uploads/'+nowFileName,function (body) {
              res.send(body)
          })
      })
  })
}).get(/convert/,function (req, res) {
  require('./baidu-convertPicToText'). getAccessToken(function (result) {
      res.send(result.access_token)
  })
  
})

app.listen(8080,function () {
  console.log('实例运行')
});