/**
 * express 路由功能
 */
var express = require("express");
var app = express();

app.get("/", function (req, res) {
    res.send("hello world");
});

app.get("/haha", function (req, res) {
    res.send("这是哈哈页面");
});

// 配合正则表达式
var reg = /^\/student\/([\d]{10})$/; // 匹配 /student/1234567890
app.get(reg, function (req, res) {
    var num = req.params[0];
    console.log(req.params)
    res.send("学生管理页面，" + "学号：" + num);
});


// 使用express 自己的
app.get("/teacher/:num", function (req, res) {
    var num = req.params.num;
    console.log(req.params)
    res.send("教师管理页面，" + "学号：" + num);
});

app.listen(3000);