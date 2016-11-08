var fs = require('fs');
var readStream = fs.createReadStream('01bg.png');//要用一个比较大的文件

var n = 0;//计数器

readStream
    .on('data',function(chunk){
        n++;
        console.log('data emits');
        console.log(Buffer.isBuffer(chunk));
        // console.log(chunk.toString());

        readStream.pause();//流暂停
        console.log('data pause');
        setTimeout(function(){
            console.log('data pause end');//流开始
            readStream.resume();
        },10);
    })
    .on('readable',function(){
        console.log('data readable');
    })
    .on('end',function(){
        console.log(n);
        console.log('data end');
    })
    .on("close",function(){
        console.log('data close')
    })
    .on('error',function(e){
        console.log('data read error' + e);
    })