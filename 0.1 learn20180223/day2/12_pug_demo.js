/**
 * Jade 已经改名为 Pug
 * 中文文档 https://pug.bootcss.com/api/getting-started.html
 */


var pug = require('pug');
var http = require('http');
var fs = require('fs');
var static = require('./static');

var data1 = {
    title: "默认",
    input_name: "name",
    input_val: '这是默认里面的input内容',
    next: "1"
}

var data2 = {
    title: "1的页面",
    input_name: "name",
    input_val: '这是1的页面里面的input内容',
    next: "2"
}

var data3 = {
    title: "2的页面",
    input_name: "name",
    input_val: '这是2的页面里面的input内容',
    next: "3"
}

var data4 = {
    title: "3的页面",
    input_name: "name",
    input_val: '这是3的页面的input内容',
    next: "/"
}

var server = http.createServer(function(req, res) {

    fs.readFile("./12_pug_demo.pug", function(err, data) {
        if (err) {
            console.log(err);
            return;
        }
        var str = data.toString();

        var template = pug.compile(str, {}); // 获得模板
        var html = "";

        if (req.url == "/") {
            html = template(data1);
        } else if (req.url == "/1") {
            html = template(data2);
        } else if (req.url == "/2") {
            html = template(data3);
        } else if (req.url == "/3") {
            html = template(data4);
        }
        res.end(html);

    });




}).listen(3000);