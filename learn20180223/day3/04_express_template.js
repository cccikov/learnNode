/**
 * express 渲染模板
 */
var express = require("express");
var app = express();

app.set("view engine", "pug");

app.get("/", function (req, res) {
    res.render("pug.pug", {
        title: "默认",
        input_name: "name",
        input_val: '这是默认里面的input内容',
        next: "/"
    }); //默认从view里面找模板文件
});

app.listen(3000);