/**
 * 搭建 http 服务器
 */

var http = require('http'); // 需要的模块

http.createServer(function(request, response) { // 请求 响应
    response.writeHead(200, {
        "Content-Type": "text/html"
    });
    response.write("<h1>Node.js</h1>");
    response.end("hello world");
}).listen(3000);
console.log("HTTP server is listening at port 3000."); // 这句话是显示在node里面的