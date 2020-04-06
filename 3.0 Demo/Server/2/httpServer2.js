/*
 *  首先先创建一个最简单的http服务器
 */
var http = require("http");
var fs = require("fs");
var n = 0;
http.createServer(function(req,res){
	console.log("\n\n\n\n\n浏览器请求");
	console.log(++n);
	fs.readFile('./index.html',function(err,data){
		res.writeHead(200,{'content-type':'text/html'});
		// console.log(data);//是buffer数据来的
		console.log(data.toString('utf8'))
		res.write(data);
		res.end();
	});
}).listen(8080);
// node httpServer2.js 运行
// 发现浏览请求才会执行createServer里面的操作 并且会执行两次