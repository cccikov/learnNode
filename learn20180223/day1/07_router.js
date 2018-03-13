// 路由
// nodejs可以很好的控制路由

var http = require("http");
var fs = require("fs");


http.createServer(function (req, res) {
    console.log(req.url);
    if (req.url == "/404.html" || req.url == "/haha" || req.url == "/page/index.html") {
        fs.readFile("./static/index.html", function (err, data) {
            if (err) {
                throw err;
                c
            } else {
                res.writeHead(200, {
                    "content-type": "text/html;charset=utf8"
                });
                res.write(data);
                res.end();
            }
        });
    } else if (req.url == "/student") {
        res.writeHead(200, {
            "content-type": "text/html;charset=utf8"
        });
        res.write("学生网站");
        res.end();
    } else if (req.url == "/teacher") {
        res.writeHead(200, {
            "content-type": "text/html;charset=utf8"
        });
        res.write("教师网站");
        res.end();
    } else if (req.url == "/index.html") {
        fs.readFile("./static/404.html", function (err, data) {
            if (err) {
                throw err;
                c
            } else {
                res.writeHead(200, {
                    "content-type": "text/html;charset=utf8"
                });
                res.write(data);
                res.end();
            }
        });
    } else {
        res.end("地址错误");
    }
}).listen(3000);

// 路由控制 , 就是说浏览器请求的地址 , 根据地址 , 我们返回对应的东西
// 比如上面的例子 /page/index.html, 常理来说我们应该返回 /page/index.html 文件, 我们是没有 /page 文件夹的 , 这里我们根据这个地址返回的是/static/index.html , 这种就是路由控制
