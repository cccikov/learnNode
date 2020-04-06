var express = require("express");
var http = require("http")

var app = express();
var server = http.createServer(app); // / 返回一个 http.Server 实例，接收的参数，就是类似express中间件，所以可以使用将app作为参数传入

app.get("/", function (req, res) {
    res.send("hello world");
});

app.get("/close", function (req, res) {
    console.log("服务准备关闭")
    server.close(_ => {
        console.log("服务成功关闭")
    });
    res.send("服务即将关闭");
});

server.listen(3000);
require('open')('http://localhost:3000'); // 自动打开浏览器