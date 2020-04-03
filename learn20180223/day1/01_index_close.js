var http = require("http");

var server = http.createServer(function (req, res) {
    var url = req.url; // 用户的请求url地址
    res.writeHeader(200, {
        "content-type": "text/plain"
    });
    res.end("<h1>hello world</h1>");
}).listen(3000);

setTimeout(() => {
    console.log("3s，准备关闭服务，阻止服务器接受新连接并保留现有连接。异步操作。")
    server.close(function () {
        console.log("服务关闭成功")
    });
}, 3000);