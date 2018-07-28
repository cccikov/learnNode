var express = require("express");
var app = express();

app.use("/", function (req, res, next) {
    res.links({
        next:'http://api.example.com/users?page=2',
        last:'http://api.example.com/user?page=5'
    }); // 设置响应头 link 字段，暂时不知道有什么用
    res.end();
});

app.listen(3000);