/**
 * express 静态服务器能力
 */

var express = require("express");
var app = express();

/**
 * 链接是about，me的时候都打开download.html
 * 因为静态资源里面真的有about.html，所以放在静态资源前面
 */
app.get(["/about.html", "/me.html"], function (req, res) {
    res.sendFile(__dirname + "/public/download.html");
});

app.use("/", express.static("public"));

/**
 * 在静态资源里面找不到的页面统一跳去index.html
 * 为了避免路径层级不一样，index.html 引用的资源使用绝对路径
 */
app.get("/*", function (req, res) {
    res.sendFile(__dirname + "/public/index.html")
});

app.listen(3000);