var express = require("express");
var app = express();
var path = require("path");

/**
 * 研究content-type的作用
 *
 * Content-Type 实体头部用于指示资源的MIME类型 media type 。
 * 具体可以看 ccc 中的 media-types.txt
 *
 * 规范：https://www.iana.org/assignments/media-types/media-types.xhtml
 */


app.get("/axios.min.js", function (req, res, next) {
    res.sendFile(path.resolve(__dirname, "../public/axios.min.js")); // express 会自动设置 Content-Type: application/javascript; charset=UTF-8
});

app.use(express.static(__dirname, {
    index: "./20_content_type.html"
})); // 以当前文件夹作为静态资源根目录

app.listen(3000);