const {spawn} = require('child_process')
const fs = require('fs')
let phantom = spawn('phantomjs',['phantom-example.js'])
phantom.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

phantom.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
});

phantom.on('close', (code) => {
    console.log(`子进程退出码：${code}`);
});
