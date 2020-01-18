/**
 * 参考例子
 * https://www.cnblogs.com/hanguidong/p/9307391.html 《nodejs入门教程之http的get和request简介及应用》
 *
 */
const express = require("express");
const app = express();
const http = require('http')
const querystring = require("querystring")


/* get 请求 */
app.get("/get", function (req, res) {
    let server_res = res; // response <http.ServerResponse>

    let params = querystring.stringify({
        name: "ccc",
        age: 28,
        by: "http.get",
        method: "get"
    });
    http.get('http://127.0.0.1:3000/data' + "?" + params, (client_res) => { // response <http.IncomingMessage>
        const { statusCode } = client_res;
        const contentType = client_res.headers['content-type'];

        console.log(`状态码: ${statusCode}，content-type：${contentType}`);
        let data = '';
        client_res.setEncoding('utf8');
        client_res.on('data', (chunk) => {
            data += chunk;
        });
        client_res.on('end', () => {
            server_res.send(data);
        });
    }).on('error', (e) => {
        server_res.send(error.message);
    });

});

/* 页面提示 */
app.get("/:path", function (req, res) {
    res.send("请加上 \"/get\" 路径，现在路径为: \"/" + req.params.path + "\"");
})
app.get("/", function (req, res) {
    res.send("请加上 \"/get\" 路径");
})

app.listen(7008);