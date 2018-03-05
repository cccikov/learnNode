var http = require("http");

var server = http.createServer(function(req, res) {
    var url = req.url; // 用户的请求url地址
    console.log("访问的地址是" + url);
    res.writeHeader(200, {
        "content-type": "text/plain"
    });
    res.end("<h1>hello world</h1>");
}).listen(3000);
