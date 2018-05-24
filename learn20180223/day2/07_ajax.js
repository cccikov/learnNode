// 完整代码
var http = require("http");
var url = require("url");
var static = require("./static");
var querystring = require("querystring");

// 创建服务器
var server = http.createServer(function(req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if (pathname == "/getData") {
        var data = ""
        req.addListener("data", function(chunk) {
            data += chunk;
        });
        req.addListener("end",function(){
            console.log(data);
            res.end(data);
        });
    } else if (pathname == "/jquery.js") { // 路由控制，请求jq的时候就找/public/jquery-1.11.3.min.js
        static(req, res, "../public/jquery-1.11.3.min.js");
    } else {
        if (pathname == "/") { // "/" 访问 默认的页面
            urlObj.pathname = "/07_ajax.html";
            req.url = url.format(urlObj);
        }
        static(req, res);
    }
    // 有时候会忘记res.end(); 但是直接在createServer最后直接写一个res.end();因为有些操作是异步的

}).listen(3000);