/**
 * joinlin 创建于 2017/10/12.
 */
var $ = function (selector) {
  return document.querySelector(selector);
};
function readyToUpload(ele) {
  console.log(ele);
}
function upload() {
  var file = $("#fileUpload").files[0];
  if(!file){
    alert("未选择文件！")
    return;
  }
  if(file.size>100000000){
    alert("文件过大！请选择小于100M的文件")
    return;
  }
  var form = new FormData();
  form.append("name","bg");
  form.append("file",file);
  Ajax({
    url:"upload",
    type:"POST",
    data:form
  },function (data) {
    if(data === "LIMIT_FILE_SIZE"){
      $("#proS").innerText="文件过大！";
      return
    }
    $("#proS").innerText =data;
  },updateProgress)
}

var imgBlob = null;
var url = "../data/AOA - Excuse MeAOA - Excus.mp4";

function load() {
  Ajax({url: url, reqType: "GET", responseType: "blob"}, function (data) {
    imgBlob = URL.createObjectURL(data);
    var link = document.getElementById("download");
    link.href = imgBlob;
    link.download = "文件下载";
    console.log("加载完成");
  }, updateProgress);
}

function updateProgress(event) {
  if (event.lengthComputable) {
    var completedPercent = (event.loaded / event.total * 100);
    draw(completedPercent,$("#proC"))
  }
}
draw(0,$("#process"));
draw(0,$("#proC"));
function draw(counter,canvas) {//接受1到100数字
  var radius = canvas.width/2-1,
      point = canvas.width/2,
      ctx = canvas.getContext("2d");
  ctx.textAlign="center";
  ctx.textBaseline="middle";
  ctx.strokeStyle="#aaaaaa";
  
  ctx.clearRect(0,0,canvas.width,canvas.width);
  ctx.fillStyle="#fbffdd";
  ctx.beginPath();
  ctx.arc(point,point,radius,0,Math.PI*2,false);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  ctx.fillStyle="#0fdd16";
  ctx.beginPath();
  ctx.arc(point,point,radius-1,-Math.PI/2,Math.PI/50*counter-Math.PI/2,false);
  ctx.lineTo(point,point);
  ctx.closePath();
  ctx.fill();
  
  ctx.fillStyle="#fbffdd";
  ctx.beginPath();
  ctx.arc(point,point,radius*0.8-1,0,Math.PI*2,false);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  ctx.fillStyle="#000000";
  ctx.font=radius*0.5+"px Arial";
  ctx.fillText(counter.toFixed(0)+"%",radius,radius);
}
function preview() {
  if (imgBlob) {
    var audio = document.getElementById("preview");
    audio.src = imgBlob;
    audio.play();
  }
  
}

function Ajax(config, fun, updateProgress) {
  //创建xhr对象
  var xhr = new XMLHttpRequest();
  //设置xhr请求的超时时间
  xhr.timeout = config.timeout || 0;
  //设置响应返回的数据格式
  xhr.responseType = config.responseType || "";
  //创建一个 post 请求，采用异步
  xhr.open(config.type || "GET", config.url, config.async || true);
  //注册相关事件回调处理函数
  xhr.onload = function (e) {
    if (this.status >= 200 && this.status < 300 || this.status == 304) {
      if(typeof fun === "function"){
        fun(this.response);
      }
      
    } else {
      console.log('error:' + xhr.status);
    }
  };
  xhr.ontimeout = function (e) {
    console.log("request timeout!")
  };
  xhr.onerror = function (e) {
    console.log("request err:" + e);
  };
  xhr.onprogress = updateProgress;
  xhr.upload.onprogress = updateProgress;
  //发送数据
  xhr.send(config.data||null);
}