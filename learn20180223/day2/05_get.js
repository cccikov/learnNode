// 补回get请求 , 关键代码
var http = require("http");
var url = require("url");

// 创建服务器
var server = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if (req.method.toLowerCase() == "get" && pathname == "/get") {
        console.log(urlObj.query);
    }
}).listen(8000);