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
        /**
         * 以下两行任意一行运行都会触发下载
         */
        // res.set("content-type", "application/octet-stream"); // 由于data是buffer类型， 没有声明content-type也没有使用res.attachment的情况下， send方法会将将Content-Type 响应头字段设置为“application / octet-stream”,会以二进制的方式发送给客户端，浏览器的话会触发下载
        // res.attachment("downloadName "+fileName); // 设置 Content-Disposition 为 attachment,并且设置filename ，filename会作为下载文件的名字。设置了Content-Disposition:attachment之后，不需要设置"content-type":"application/octet-stream"，
        /**
         * Content-Disposition: inline 表示回复中的消息体会以页面的一部分或者整个页面的形式展示
         * Content-Disposition: attachment 意味着消息体应该被下载到本地；大多数浏览器会呈现一个“保存为”的对话框，将filename的值预填为下载后的文件名，假如它存在的话
         * Content-Disposition: attachment; filename="filename.jpg"
         */
        /**
         * 以下两行代码为 在页面显示
         */
        // res.set("content-type", "text/plain");
        // res.set("Content-Disposition", "inline");
        /**
         * 以下两行代码为 下载
         */
        // res.set("content-type", "application/octet-stream"); // 这个触发下载
        // res.set("Content-Disposition", "inline");
        /**
         * 以下两行代码为 下载
         */
        // res.set("content-type", "text/plain");
        // res.set("Content-Disposition", "attachment; filename=xxx.html"); // 这个触发下载

        res.send(data); // data的类型为buffer 如果没有设置"Content-Disposition"为"attachment"，也没有手动设置content-type。send方法会自动根据类型设置content-type，由于是buffer，所以会设置为"application/octet-stream"，所以也会触发下载
    });
});

app.listen(3000);