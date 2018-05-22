// 完整代码
var http = require("http");


// 创建服务器
var server = http.createServer(function (req, res) {

    if (req.method.toLowerCase() == "get") { // get请求
        console.log("===== 这是get请求 =====");

        if (req.url.toLowerCase() == "/static/success.html") {
            responseSuccess(req, res);
        }

    } else if (req.method.toLowerCase() == "post") { // post请求
        console.log("===== 这是post请求 =====");

        var data = ""; // 拼接前的数据
        req.addListener("data", function (chunk) { // stream 的'data'事件
            data += chunk; // 拼接数据
            // 其实chunk是二进制数据
            console.log(chunk);
            console.log(chunk.toString()); // 二进制转化为字符串
        });
        req.addListener("end", function () { // stream 的'end'事件
            console.log(data);
            // 表单提交后，一般都会从定向
            toSuccess(req, res);
        });


    }


}).listen(8000);


// 重定向到success页面
function toSuccess(req, res) {
    res.writeHead(302, {
        "content-type": "text/html;charset=utf8",
        'location': '/static/success.html'
    });
    res.end();
}

// 当前请求时success.html是返回
function responseSuccess(req, res) {
    res.writeHead(200, {
        'content-type': "text/html;charset=utf8"
    });
    res.write("提交成功");
    res.end();
}

// 静态服务器
function static(req, res){

}