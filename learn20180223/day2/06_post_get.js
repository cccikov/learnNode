// 完整代码
var http = require("http");
var url = require("url");
var static = require("./static");
var querystring = require("querystring");

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
            res.writeHead(200, {
                'content-type': "text/html;charset=utf8"
            });
            var write = {
                msg: "success",
                'method': methods,
                "data": data
            };
            res.end(JSON.stringify(write)); // 先组成对象，然后再由JSON.stringify()转化为JSON字符串

        } else if (pathname == "/static/success.html") {
            // 处理重定向
            res.writeHead(200, {
                'content-type': "text/html;charset=utf8"
            });
            res.end("重定向成功");

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

        if (pathname == "/postData") {
            methods = "post";
            data = ""; // 拼接前的数据
            req.addListener("data", function (chunk) { // stream 的'data'事件
                data += chunk; // 拼接数据
            });
            req.addListener("end", function () { // stream 的'end'事件
                data = querystring.parse(data);
                res.writeHead(200, {
                    'content-type': "text/html;charset=utf8"
                });
                res.end(`{
                    "msg":"success",
                    "method":"${methods}",
                    "responseTime":${new Date().getTime()},
                    "data":${JSON.stringify(data)}
                }`); // 字符串拼接成一个JSON字符串
            });

        } else {
            res.end("");
        }
    } else {
        // 在createServer代码中，如果有if判断，一定要在判断的最后补上剩下的可能，然后加上res.end();
        res.end("");
    }

    // 有时候会忘记res.end(); 但是直接在createServer最后直接写一个res.end();因为有些操作是异步的

}).listen(3000);

















// 重定向到success页面
function redirect(req, res) {
    res.writeHead(302, {
        "content-type": "text/html;charset=utf8",
        'location': '/static/success.html'
    });
    res.end();
}

/**
 * 通过这个例子可以就可以看出 get请求实际上请求附带的数据都是在url上的
 */