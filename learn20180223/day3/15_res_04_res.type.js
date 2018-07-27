var express = require("express");
var app = express();

// res.type() 识别内容类型
app.get("/json", function (req, res, next) {
    res.type("json");
    res.send("<h3>哈哈</h3>")
});

app.get("/js", function (req, res, next) {
    res.type("js");
    res.send("<h3>哈哈</h3>")
});

app.get("/txt", function (req, res, next) {
    res.type(".txt");
    res.send("<h3>哈哈</h3>")
});

app.get("/html", function (req, res, next) {
    res.type("html");
    res.send("<h3>哈哈</h3>")
});

app.get("/css", function (req, res, next) {
    res.type("css");
    res.send("<h3>哈哈</h3>")
});


app.listen(3000);