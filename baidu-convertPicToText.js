let request = require('request');
let qs = require('querystring');
let fs = require('fs')
const param = qs.stringify({
    'grant_type': 'client_credentials',
    'client_id': '7cUR2UYYpppvehCcL35fYbhy',
    'client_secret': 'GtsIeQ4i9UFeS1PQyvbENvEmCVdem3EG'
});
let access_token = ''
exports.getAccessToken = (func) =>{
    request('https://aip.baidubce.com/oauth/2.0/token?' + param,
      function(error, res, body) {
          if (error || res.statusCode!=200) {
              console.log('error');
          } else {
              let token = JSON.parse(body)
              access_token = token.access_token
              func(token)
          }
      }
    );
}
let recognize = (fileDir,func)=>{
    let formData = {
        image: encodeURI(base64_encode(fileDir))
    };
    request.post({
        url:'https://aip.baidubce.com/rest/2.0/ocr/v1/accurate_basic?access_token='+access_token,
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        formData: formData
      },
      function optionalCallback(err, httpResponse, body) {
        if (err) {
            func(null)
            return console.error('upload failed:', err);
        }
        console.log('Upload successful!  Server responded with:', body);
        func(body)
    });
}
exports.recognize = recognize

function base64_encode(file) {
    let bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}