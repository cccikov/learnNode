var express = require("express");
var app = express();
var path = require("path");

var multer = require('multer')
var upload = multer({
    dest: 'uploads/'
});

app.post("/file", (req, res, next) => {
    // 在中间件里面调用中间件函数。
    var middleware = upload.any(); // 中间件，中间件的本质是一个函数
    middleware(req, res, next); // 调用中间件，由于中间件函数执行时，会传入req, res, next；所以传入req, res, next来调用
}, function (req, res, next) {
    res.send({
        file: req.file,
        files: req.files,
        body: req.body,
        "content-type": req.headers["content-type"], // 如果没有的话就不发去客户端
        "x-requested-with": req.headers["x-requested-with"],
        method: req.method,
        protocol: req.protocol,
    });
});

app.get("/axios.min.js", function (req, res, next) {
    res.sendFile(path.resolve(__dirname, "../public/axios.min.js")); // express 会自动设置 Content-Type: application/javascript; charset=UTF-8
});

app.use(express.static(__dirname, {
    index: "./21_express_upload.html"
})); // 以当前文件夹作为静态资源根目录

app.listen(3000);