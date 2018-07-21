var express = require("express");
var app = express();
var fs = require("fs");

// 显示内容
app.get("/", function (req, res, next) {
    console.log(res.end());
    res.sendFile(__dirname + "/12_res_01.html", function (err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        }
        console.log(res.end());
    });
});

app.listen(3000);