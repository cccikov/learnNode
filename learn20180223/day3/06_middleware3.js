/**
 * 错误中间件
 */
var express = require("express");
var app = express();
var fs = require("fs");

app.get("/", function (req, res, next) {
    next(new Error("error haha"))
});

app.get("/file", function (req, res, next) {
    fs.readFile("/haha",function(err,data){
        if(err){
            return next(err); // 这里 return 的作用是为了不执行下面语句
        }
        res.send("haha");
    });
});


// 错误处理中间件和其他中间件定义类似，只是要使用 4 个参数，而不是 3 个，其签名如下： (err, req, res, next)。
// 错误处理中间件有 4 个参数，定义错误处理中间件时必须使用这 4 个参数。即使不需要 next 对象，也必须在签名中声明它，否则中间件会被识别为一个常规中间件，不能处理错误。
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(3000);