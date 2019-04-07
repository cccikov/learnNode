var formidable = require('formidable'),
    http = require('http'),
    util = require('util');
var static = require("./static");

http.createServer(function (req, res) {

    if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
        // parse a file upload
        var form = new formidable.IncomingForm();
        form.uploadDir = "./";

        form.parse(req, function (err, fields, files) {
            res.writeHead(200, {
                'content-type': 'text/plain'
            });
            res.write('received upload:\n\n');
            res.end(util.inspect({
                fields: fields,
                files: files
            }));
        });

    } else {
        if (req.url == "/") { // "/" 访问 默认的页面
            static(req, res, "./08_fileupload.html");
            return;
        }
        static(req, res);
    }

}).listen(3000);


/**
 * enctype 属性规定在发送到服务器之前应该如何对表单数据进行编码。
 *
 * application/x-www-form-urlencoded	在发送前编码所有字符（默认）
 * multipart/form-data	                不对字符编码。在使用包含文件上传控件的表单时，必须使用该值。
 * text/plain	                        空格转换为 "+" 加号，但不对特殊字符编码。
 */