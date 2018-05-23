var http = require("http");
var querystring = require("querystring");

// 创建服务器
var server = http.createServer(function (req, res) {

    /**
     * post 请求关键代码
     * 先判断是post请求
     * 再分别监听'data'事件，回调函数中会返回一段数据块--chunk
     * 监听'end'事件
     */
    // 如果请求的方法是post的时候
    if (req.method.toLowerCase() == "post") {
        var data = ""; // 拼接前的数据
        req.addListener("data", function (chunk) { // stream 的'data'事件
            data += chunk; // 拼接数据
            // 其实chunk是二进制数据
            console.log(chunk);
            console.log(chunk.toString()); // 二进制转化为字符串
        });
        req.addListener("end", function () { // stream 的'end'事件
            res.end("haha");
        });
    }

}).listen(8000);