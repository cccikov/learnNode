let url = require("url");
let path = require("path");
let fs = require("fs");
let contentType = require("../public/contentType").type;
contentType = JSON.parse(contentType);

module.exports = static;

function static(req, res, filepath) {
    let pathname = url.parse(req.url, true).pathname;
    var file_pathname = path.resolve(__dirname, "./" + pathname);
    file_pathname = filepath || file_pathname; // 如果有特定指定路径的时候，按照这路径，而不是req.url里面的pathname作为路径

    fs.readFile(file_pathname, "utf8", function (err, data) {
        if (err) {
            console.error("error:readFile发生错误----" + err);
            res.write(file_pathname + " 404 not found");
        } else {
            let extname = path.extname(file_pathname);
            let type = contentType[extname];
            if (type) {
                res.writeHead(200, {
                    "content-type": type + ";charset=utf8"
                });
            }
            res.write(data);
        }
        res.end();
    });
}