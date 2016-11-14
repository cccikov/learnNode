/*
 *  首先先创建一个最简单的http服务器
 */
var http = require("http");
http.createServer(function(req,res){
	console.log("浏览器请求")
	res.writeHead(200,{'content-type':'text/plain'});
	res.write("hello world");
	res.end();
}).listen(8080);

// node httpServer1.js 运行