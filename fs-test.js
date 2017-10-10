/**
 * joinlin 创建于 2017/10/9.
 */
const fs = require('fs');
// fs.mkdir('data',function (err) {
//   if(err){
//     console.log("err:"+err);
//   }else {
//     console.log('OK')
//   }
// })
fs.writeFile('string.txt',"this is a new string,这是一条新的字符串",(err) => {
  if(err){
    console.log(err);
  }else {
    console.log('OK');
    if(fs.existsSync('./data/string1.txt')){
      fs.unlinkSync('./data/string1.txt')
    }
    fs.link('./string.txt','./data/string1.txt',(err2) => {
      if(err2){
        console.log(err2);
      }else {
        console.log('OK')
      }
    })
  }
})
