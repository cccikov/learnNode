var formidable = require('formidable'),
    http = require('http'),
    util = require('util'),
    path = require('path');
var static = require("./static");
var url = require("url");

http.createServer(function (req, res) {
    var urlObj = url.parse(req.url);
    var pathname = urlObj.pathname;
    // console.log("请求地址： " + pathname);
    if (pathname == '/upload' && req.method.toLowerCase() == 'post') {
        // console.log("进来了")
        // parse a file upload
        var form = new formidable.IncomingForm();
        form.uploadDir = "./";
        form.multiples = true; // 多文件上传

        form.parse(req, function (err, fields, files) {
            // console.log(err, fields, files)
            res.writeHead(200, {
                'content-type': 'application/json'
            });
            console.log(util.inspect({
                fields: fields,
                files: files
            }, false, 3)); // 递归3层。注意，这个方法返回的字符不是JSON格式的字符串
            res.write(
                JSON.stringify({
                    fields: fields,
                    files: files
                })
            ); // 返回的数据只能是buffer 或者 字符串，就算是json格式的，也只能返回JSON字符串
            res.end();
        });

    } else if (pathname == "/axios.min.js") { // 路由控制，axios.min.js
        static(req, res, path.resolve(__dirname, "../public/axios.min.js"));
    } else if (pathname == "/axios.min.map") { // 路由控制，axios.min.map 返回空
        res.end("")
    } else {
        if (req.url == "/") { // "/" 访问 默认的页面
            static(req, res, path.resolve(__dirname, "14_ajax_uploadfile.html"));
            return;
        }
        static(req, res);
    }

}).listen(3000);