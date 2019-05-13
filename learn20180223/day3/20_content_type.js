var express = require("express");
var app = express();
var path = require("path");
var fs = require("fs");
var path = require("path");

/**
 * 研究content-type的作用
 *
 * Content-Type 实体头部用于指示资源的MIME类型 media type 。
 * 具体可以看 ccc 中的 media-types.txt
 *
 * 规范：https://www.iana.org/assignments/media-types/media-types.xhtml
 */


app.get("/axios.min.js", function (req, res, next) {
    res.sendFile(path.resolve(__dirname, "../public/axios.min.js")); // express 会自动设置 Content-Type: application/javascript; charset=UTF-8
});

app.get("/jquery.min.js", function (req, res, next) {
    res.sendFile(path.resolve(__dirname, "../public/jquery-1.11.3.min.js")); // express 会自动设置 Content-Type: application/javascript; charset=UTF-8
});

app.get("/json",function(req,res,next){
    res.set("content-type", "application/json"); // content-type
    res.send({
        name:"ccc"
    });
});

app.get("/json/str",function(req,res,next){
    res.set("content-type", "text/plain"); // content-type
    res.send({
        name:"ccc"
    });
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