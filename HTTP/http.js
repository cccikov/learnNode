// var http=require("http");

// http.createServer(function(req,res){
//     res.writeHead(200,{
//         "content-type":"text/plain"
//     });
//     res.write("hello nodejs");
//     res.end();
// }).listen(3000);

/*var http = require("http");
http.createServer(function(req,res){
    res.writeHead(200,{
        "content-type":"text/plain"
    });
    res.write("hello nodejs2");
    res.end();

}).listen(3000);
*/

/*上面代码可以改写成这样*/
var http=require("http");
var server=new http.Server();

server.on("request",function(req,res){
    res.writeHead(200,{
        "content-type":"text/plain"
    });
    res.write("hello nodejs");
    res.end();
});
server.listen(3000);

// 其实createServer的回调函数 就是 request 的监听器 , createServer方法会返回http.server对象 , server的listen事件触发request事件