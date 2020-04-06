/*
 *
 *   Readable 可读流(用来提供数据) 外部的数据会存储在内部的Buffer里面缓存起来
 *   两种模式 流动模式resume() 暂停模式pause() 流处于流动模式的时候,数据从底层系统读出,提供给上层应用程序
 *
 *   writable 可写流(消费数据) 从可读流里面获得的Buffer数据进行处理
 *
 *   Duplex 双峰流,实现了readable writable两个接口
 *
 *   Transform 也是实现了readable writable 不过,不负责保存数据,只负责处理流经的数据(流的中间部分,类似阀门)
 *
 */

// 请求图片
var http = require('http');
var fs = require('fs'); //文件处理系统

/* http.createServer(function(req,res){
    fs.readFile('01bg.png',function(err,data){
        if(err){
            res.end('file not exist');
        }else{
            res.writeHeader(200,{'Context-Type':'text/html'});
            res.end(data);
        }
    })
 }).listen(8090);//运行 打开浏览器 localhost:8090 就可以看到图片了 */


http.createServer(function(req, res) {
    fs.createReadStream('01bg.png').pipe(res);
}).listen(8090); //运行 打开浏览器 localhost:8090 就可以看到图片了
