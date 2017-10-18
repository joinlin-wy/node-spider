/**
 * Created by joinlin on 2017/5/13.
 */
var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({port: 8888});
var webSocket = {
  instance:[],
  serverStart: function () {
    
    wss.on('connection', function (ws) {
      ws.id=Math.random();
      webSocket.instance.push(ws);
      console.log("第"+webSocket.instance.length+"个连接建立");
      ws.on('message', function (message) {
        console.log(message);
        ws.send("收到请求");
      }).on('error', function (error) {
        console.log(error);
      }).on('close', function (ss) {
        console.log("连接关闭");
        for(var i=0;i<webSocket.instance.length;i++){
          if(webSocket.instance[i] === ws){
            webSocket.instance.splice(i,1);
            console.log("实例清除");
          }
        }
      });
    });
    console.log("websocket 访问实例：localhost:" + 8888);
  }
};

function getNowTime() {
  var date = new Date();
  return date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

module.exports = webSocket;
