/**
 * express 静态服务器能力
 */

var express = require("express");
var app = express();
var bodyParser = require('body-parser');


// 根据请求头Content-Type采用不同的中间件，可以全部都写，因为会将控制权交给下一个中间件
app.use(bodyParser.json()); // for parsing application/json ; content-type 为 application/json 的时候
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded form表单形式的请求，jq的默认形式是"Content-Type":"application/x-www-form-urlencoded"

app.post("/data", function (req, res) {
    console.log("method:", req.method)
    console.log("body:", req.body);
    console.log("query:", req.query);
    console.log("\n")
    res.send({
        method: req.method,
        "body": req.body,
        query: req.query
    });
});

app.get("/data", function (req, res) {
    console.log("method:", req.method)
    console.log("body:", req.body);
    console.log("query:", req.query);
    console.log("\n")
    res.send({
        method: req.method,
        "body": req.body,
        query: req.query
    });
});

app.listen(3000, "192.168.0.174");