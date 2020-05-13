var express = require("express");
var app = express();
var path = require("path");
var fs = require("fs");
var path = require("path");
var bodyParser = require('body-parser');

var multer = require('multer')
var upload = multer({
    dest: 'uploads/'
});

/**
 * 研究content-type的作用
 *
 * Content-Type 实体头部用于指示资源的MIME类型 media type 。
 * 具体可以看 ccc 中的 media-types.txt
 *
 * 规范：https://www.iana.org/assignments/media-types/media-types.xhtml
 */

// 根据请求头Content-Type采用不同的中间件，可以全部都写，因为会将控制权交给下一个中间件
app.use(bodyParser.json()); // for parsing application/json ; content-type 为 application/json 的时候
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded form表单形式的请求，jq的默认形式是"Content-Type":"application/x-www-form-urlencoded"


/**
 * post 请求
 */
app.post("/data", function (req, res, next) {
    res.send({
        body: req.body,
        "content-type": req.headers["content-type"], // 如果没有的话就不发去客户端
        "x-requested-with": req.headers["x-requested-with"],
        method: req.method,
        protocol: req.protocol,
    });
});
app.post("/multer/data", upload.none(), function (req, res, next) { // upload.none() 纯文本的formdata 就是没有上传文件的
    res.send({
        body: req.body,
        "content-type": req.headers["content-type"], // 如果没有的话就不发去客户端
        "x-requested-with": req.headers["x-requested-with"],
        method: req.method,
        protocol: req.protocol,
    });
});

/**
 * get 请求
 */
app.get("/data", function (req, res, next) {
    res.send({
        query: req.query,
        "content-type": req.headers["content-type"], // 如果没有的话就不发去客户端
        "x-requested-with": req.headers["x-requested-with"],
        method: req.method,
        protocol: req.protocol,
    });
});


app.get("/axios.min.js", function (req, res, next) {
    res.sendFile(path.resolve(__dirname, "../public/axios.min.js")); // express 会自动设置 Content-Type: application/javascript; charset=UTF-8
});

app.get("/jquery.min.js", function (req, res, next) {
    res.sendFile(path.resolve(__dirname, "../public/jquery-1.11.3.min.js")); // express 会自动设置 Content-Type: application/javascript; charset=UTF-8
});

app.get("/json", function (req, res, next) {
    res.set("content-type", "application/json"); // content-type
    res.send({
        name: "ccc"
    });
});

app.get("/json/str", function (req, res, next) {
    res.set("content-type", "text/plain"); // content-type
    var str = JSON.stringify({
        name: "ccc"
    })
    res.send(str);
});

app.get("/text/:path", function (req, res, next) {
    fs.readFile(path.resolve(__dirname, req.params.path), function (err, data) {
        if (err) {
            throw err;
        }
        res.set("content-type", "text/plain"); // content-type
        res.send(data);
    });
});

app.use(express.static(__dirname, {
    index: "./20_content_type.html"
})); // 以当前文件夹作为静态资源根目录

app.listen(3000);
require('open')('http://localhost:3000');