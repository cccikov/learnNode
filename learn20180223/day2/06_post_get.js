// 完整代码
var http = require("http");
var url = require("url");
var static = require("./static");

var methods = "";
var data = {};


// 创建服务器
var server = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;

    if (req.method.toLowerCase() == "get") { // get请求
        console.log("===== 这是get请求 =====" + pathname);

        if (pathname == "/getData") {
            methods = "get";
            data = urlObj.query;
            toSuccess(req, res);
        } else if (pathname == "/static/success.html") {
            responseSuccess(req, res);
        } else if (pathname == "/jquery.js") { // 路由控制，请求jq的时候就找/public/jquery-1.11.3.min.js
            static(req, res, "../public/jquery-1.11.3.min.js");
        } else {
            if (pathname == "/") { // "/" 访问 06_post_get.html
                urlObj.pathname = "/06_post_get.html";
                req.url = url.format(urlObj);
            }
            static(req, res);
        }

    } else if (req.method.toLowerCase() == "post") { // post请求
        console.log("===== 这是post请求 =====");

        data = ""; // 拼接前的数据
        req.addListener("data", function (chunk) { // stream 的'data'事件
            data += chunk; // 拼接数据
            // 其实chunk是二进制数据
            console.log(chunk);
            console.log(chunk.toString()); // 二进制转化为字符串
        });
        req.addListener("end", function () { // stream 的'end'事件
            console.log(data);
            // 表单提交后，一般都会从定向
            toSuccess(req, res);
        });

    }


}).listen(3000);

// 重定向到success页面
function toSuccess(req, res) {
    res.writeHead(302, {
        "content-type": "text/html;charset=utf8",
        'location': '/static/success.html'
    });
    res.end();
}

// 当前请求时success.html是返回
function responseSuccess(req, res) {
    res.writeHead(200, {
        'content-type': "text/html;charset=utf8"
    });
    res.write("提交成功 " + "，提交方式：" + methods + "，提交数据：" + JSON.stringify(data));
    res.end();
}