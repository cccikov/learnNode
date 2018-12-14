var formidable = require('formidable'),
    http = require('http'),
    util = require('util');
var static = require("./static");
var url = require("url");

http.createServer(function (req, res) {
    var urlObj = url.parse(req.url);
    var pathname = urlObj.pathname;
    console.log("请求地址： "+pathname);
    if (pathname == '/upload' && req.method.toLowerCase() == 'post') {
        console.log("进来了")
        // parse a file upload
        var form = new formidable.IncomingForm();
        form.uploadDir = "./";

        form.parse(req, function (err, fields, files) {
            console.log(err, fields, files)
            res.writeHead(200, {
                'content-type': 'text/plain'
            });
            res.write('received upload:\n\n');
            res.end(util.inspect({
                fields: fields,
                files: files
            }));
        });

    }  else if (pathname == "/axios.min.js") { // 路由控制，axios.min.js
        static(req, res, "../public/axios.min.js");
    } else if (pathname == "/axios.min.map") { // 路由控制，axios.min.map 返回空
        res.end("")
    }else {
        if (req.url == "/") { // "/" 访问 默认的页面
            static(req, res, "./14_ajax_uploadfile.html");
            return;
        }
        static(req, res);
    }

}).listen(3000);
