/**
 * joinlin 创建于 2017/10/12.
 */
const express = require("express");
const fs = require("fs");
//multer API https://www.npmjs.com/package/multer
const multer = require("multer");
const app = express();
app.use(express.static('dist'));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'data/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+ '-' +file.originalname  )
  }
});

var upload = multer({ storage: storage ,limits:{fileSize:100000000}}).single('file');//"file"是文件的name属性值
app.post('/upload',function (req,res) {
  upload(req, res, function (err) {
    if (err) {
      res.send(err.code);
      return
    }
    res.send("ok")
  })
})

app.listen(80,function () {
  console.log('实例运行')
});