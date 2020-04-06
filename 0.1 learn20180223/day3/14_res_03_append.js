var express = require("express");
var app = express();

app.get("/", function (req, res, next) {

    // 设置多个warning
    res.set("warning", "warning1");
    res.append("warning", "warning2");
    res.append("warning", "[warning3,warning4]");

    var accepts = req.accepts(); // 这个才是多个 MIME类型 值，
    res.set("Content-Type", "text/plain;chartset=utf-16;chartset=gbk"); //这个是设置内容类型（Content-Type），只能是一个值；后面可以选择加上编码格式chartset，就算不加express也会自动补上 charset=utf-8

    res.send("<a href=\"/1\">haha</a>"); //由于content-type是text/plain 纯文本，所以a标签直接显示源代码
});
// http://localhost:3000/


app.get("/1", function (req, res, next) {
    // 设置多个warning
    res.set("warning", "warning1");
    res.append("warning", "warning2");
    res.append("warning", "[warning3,warning4]");
    res.set("warning", "warning1"); // 在res.append()之后调用app.set()函数将重置前面设置的值。

    res.set("content-type", "text/plain;chartset=gbk");
    res.end("123");
});
// http://localhost:3000/1


app.get("/2", function (req, res, next) {
    // 设置多个warning
    res.append("content-type", "text/html"); // content-type 没有被设置，自动新建这个头部
    res.send("<a href=\"/\">haha</a>");
});
// http://localhost:3000/2

app.listen(3000);