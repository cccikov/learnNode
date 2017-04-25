/*
 * 简书http server
 * http://www.jianshu.com/p/7ddcc6f4ff71
 */

var http = require("http");//引用http模块
var fs = require("fs");//引入文件读取模块

var documentRoot = "D:/cccgit"

var server = http.createServer(function(req,res){

    var url = req.url;

    var file = documentRoot + url;
    console.log(file);

    fs.readFile(file,function(err,data){
        /*
         * file 为文件路径
         * function 为回调函数
         *      err 为读取错误返回的信息，返回空就没有错误
         *      data 为读取成功返回的文本内容
         */
        if(err){
            console.log(err);
            res.writeHeader(404,{
                'content-type':'text/html;charset = "utf-8"',
            });
            res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
            res.end();
        }else{
            res.writeHeader(200,{
                'content-type':'text/html;charset = "utf-8"',
            });
            res.write(data);//将html文件显示在客户端
            res.end();
        }
    });

}).listen(8888);