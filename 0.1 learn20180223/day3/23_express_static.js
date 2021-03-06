/**
 * express 静态服务器能力
 *
 * 打算用于解决，类似vue history 模式 打包后，本质上只有单文件，无论什么路径都是跳去index.html，由vue-router处理路由问题
 * connect-history-api-fallback
 */

var express = require("express");
var app = express();

app.use("/", function (req, res, next) {
    if (req.url.split("/").length <= 2) {
        if (req.url.split(".").slice(-1) == "html") {
            req.url = "/about.html"; // express.static 是根据 req.url 作为静态资源的请求路径的，所以只需要改动req.url就能改变请求的静态资源
        }
    }
    next()
}, express.static("public"));

app.get("/", function (req, res) {
    res.end("404")
})

app.listen(3000);