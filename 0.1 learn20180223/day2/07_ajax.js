// 完整代码
var http = require("http");
var url = require("url");
var static = require("./static");
var querystring = require("querystring");

var reg = /.+\/[^;]+/; // 匹配content-type的正则

// 创建服务器
var server = http.createServer(function(req, res) {
    var urlObj = url.parse(req.url);
    var pathname = urlObj.pathname;
    if (pathname == "/getData") {
        var method = req.method.toLowerCase();

        if (method == "get") {
            var data = urlObj.query;
            data = querystring.parse(data);
            data = JSON.stringify(data);
            res.end(data); // 服务器 回应 的数据格式只能是 字符串 或者 二进制数据（fs读的数据），二进制数据在浏览器解释好像也是字符串
        } else if (method == "post") {
            var contentType = req.headers["content-type"].match(reg)[0];
            var data = ""
            req.addListener("data", function(chunk) {
                data += chunk; // chunk 是一个二进制数据
            });
            req.addListener("end", function() {
                if(contentType == "application/json"){ // 如果请求头是json的直接返回
                    res.end(data);
                }else{
                    data = querystring.parse(data);
                    data = JSON.stringify(data);
                    res.end(data);
                }
            });
        } else {
            res.end("什么鬼嘛，post get 都不是");
        }
    } else if (pathname == "/jquery.js") { // 路由控制，请求jq的时候就找/public/jquery-1.11.3.min.js
        static(req, res, "../public/jquery-1.11.3.min.js");
    } else if (pathname == "/axios.min.js") { // 路由控制，axios.min.js
        static(req, res, "../public/axios.min.js");
    } else if (pathname == "/axios.min.map") { // 路由控制，axios.min.map 返回空
        res.end("")
    }else {
        if (pathname == "/") { // "/" 访问 默认的页面
            urlObj.pathname = "/07_ajax.html";
            req.url = url.format(urlObj);
        }
        static(req, res);
    }
    // 有时候会忘记res.end(); 但是直接在createServer最后直接写一个res.end();因为有些操作是异步的

}).listen(3000);