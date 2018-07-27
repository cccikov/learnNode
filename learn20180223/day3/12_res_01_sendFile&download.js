var express = require("express");
var app = express();
var fs = require("fs");

app.get("/", function(req, res, next) {
    res.sendFile(__dirname + "/12_res_01.html", function(err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        } else {
            console.log('Sent');
        }
    });
});


/**
 * 显示内容
 */

// express sendFile
app.get("/express/:name", function(req, res, next) {
    var options = {
        root: __dirname,
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    var fileName = req.params.name;
    res.sendFile(fileName, options, function(err) {
        !!err && console.log(err);
    });
});

// 原生的
app.get("/node/:name", function(req, res, next) {
    var fileName = req.params.name;
    fs.readFile(__dirname + "/" + fileName, function(err, data) {
        if (err) {
            throw err;
        }
        res.set("content-type", "text/html");
        res.send(data);
    });
});











/**
 * 下载内容
 */

// express
app.get("/download/:name", function(req, res, next) {
    var fileName = req.params.name;
    res.download(__dirname + "/" + fileName, function(err, data) {
        if (err) {
            throw err;
        }
    });
});

// 原生的
app.get("/file/:name", function(req, res, next) {
    var fileName = req.params.name;
    fs.readFile(__dirname + "/" + fileName, function(err, data) {
        if (err) {
            throw err;
        }
        // res.set("content-type", "application/octet-stream"); // buffer 没有声明content-type的情况下 类型是send方法将Content-Type 响应头字段设置为“application / octet-stream”
        res.attachment("downloadName "+fileName); // 设置 Content-Disposition 为 attachment,并且设置filename ，filename会作为下载文件的名字
        res.send(data);
    });
});

app.listen(3000);