module.exports = static(req, res);

function static(req, res) {
    fs.readFile(file_pathname, "utf8", function (err, data) {
        console.log(pathname, file_pathname);
        if (err) {
            console.error("readFile发生错误----" + err);
            show404(res);
        } else {
            if (isOrigin) { // 这里可以理解为路由控制
                res.writeHead(200, {
                    "content-type": "text/plain;charset=utf8" // 不加;charset=utf8 css js中文会乱码
                });
            } else { // 这里才是真正的静态服务器
                let extname = path.extname(file_pathname);
                let type = contentType[extname];
                console.log(type);
                if (type) {
                    res.writeHead(200, {
                        "content-type": type + ";charset=utf8"
                    });
                }
            }
            res.write(data);
            res.end();
        }
    });
}