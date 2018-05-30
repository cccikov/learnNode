/**
 * 用法1：
 * var template = ejs.compile(str, options);
 * template(data);
 *
 *
 * 用法2：
 * ejs.render(str, data, options);
 *
 *
 * 用法3：
 * ejs.renderFile(filename, data, options, function(err, str){
 * });
 */

var ejs = require("ejs");
var fs = require('fs');
var http = require('http');
var static = require('./static');


{
    let str = `<% if (user) { %>
            <h2><%= user.name %></h2>
        <% } %>`;
    let data = {
        user: {
            name: "ccc",
            age: 18
        }
    };
    let options = {};

    // 用法1
    let template = ejs.compile(str, options);
    let html1 = template(data);
    console.log(html1);

    // 用法2
    let html2 = ejs.render(str, data, options);
    console.log(html2);
}


{

    var tplData = {
        list: [{
            num: 0
        }, {
            num: 1
        }, {
            num: 2
        }, {
            num: 3
        }, {
            num: 4
        }, {
            num: 5
        }, {
            num: 6
        }, {
            num: 7
        }]
    };


    // 方式1
    fs.readFile(__dirname + "/10_ejs.ejs", function(err, data) {
        if (err) {
            console.log(err);
            return;
        }
        var str = data.toString();

        // 方式1 主要代码
        var template = ejs.compile(str); // 可以将模板存起来，然后通过添加不同的数据，最终得到内容不一样的html
        var html = template(tplData);

        console.log(html);
    });

    // 方式2
    fs.readFile(__dirname + "/10_ejs.ejs", function(err, data) {
        if (err) {
            console.log(err);
            return;
        }
        var str = data.toString();

        // 方式2 主要代码
        var html = ejs.render(str, tplData);

        console.log(html);
    });


    // 方式3，方式3是将fs都封装了
    ejs.renderFile(__dirname + "/10_ejs.ejs", tplData, {}, function(err, str) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(str);
    });

}


// 创建服务器
http.createServer(function(req, res) {
    if (req.url == "/") {
        ejs.renderFile(__dirname + "/10_ejs.ejs", tplData, {}, function(err, str) {
        if (err) {
            console.log(err);
            return;
        }
        res.end(str);
    });
    }
}).listen(3000);