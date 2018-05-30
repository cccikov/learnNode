/**
 * Jade 已经改名为 Pug
 * 中文文档 https://pug.bootcss.com/api/getting-started.html
 */


var pug = require('pug');
var http = require('http');
var fs = require('fs');
var static = require('./static');


var server = http.createServer(function(req, res) {




    fs.readFile("./12_pug_demo.pug", function(err, data) {
        if (err) {
            console.log(err);
            return;
        }
        var str = data.toString();

        var template = pug.compile(str, {}); // 获得模板
        var html = "";

        if (req.url == "/1") {
            html = template({
                title: "方法1"
            });
        } else if (req.url == "/2") {
            html = template({
                title: "方法2"
            });
        } else if (req.url == "/3") {
            html = template({
                title: "方法3"
            });
        }
        res.end(html);

    });




}).listen(3000);