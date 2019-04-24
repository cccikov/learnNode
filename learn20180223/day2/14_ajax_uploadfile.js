var formidable = require('formidable'),
    http = require('http'),
    util = require('util'),
    fs = require('fs'),
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

            /**
             * 改名
             */
            console.log(Object.values(files));
            Object.values(files).forEach(val=>{
                rename(val);
            });

            /**
             * 相应
             */
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
    } else if (pathname == "/jquery.js") { // 路由控制，请求jq的时候就找/public/jquery-1.11.3.min.js
        static(req, res, path.resolve(__dirname, "../public/jquery-1.11.3.min.js"));
    } else {
        if (req.url == "/") { // "/" 访问 默认的页面
            static(req, res, path.resolve(__dirname, "14_ajax_uploadfile.html"));
            return;
        }
        static(req, res);
    }

}).listen(3000);



function rename(file) {
    var oldPath = __dirname + "/" + file.path;
    var extname = path.extname(file.name);
    var basename = path.basename(file.name, extname);
    var dir = "/pic"
    var time = new Date().getTime();
    var newPath = __dirname + dir + "/" + basename + "_" + time + extname;

    fs.access(__dirname + dir, function (err) {
        if (!!err && err.code == 'ENOENT') { // 无此文件或目录
            fs.mkdir(__dirname + dir, function () { // 新建一个新的文件夹
                handler(oldPath, newPath);
            });
            return;
        };
        handler(oldPath, newPath);
    });

    function handler(oldPath, newPath) {
        fs.rename(oldPath, newPath, function (err) {
            if (err) {
                console.error(err);
            }
        });
    }
}