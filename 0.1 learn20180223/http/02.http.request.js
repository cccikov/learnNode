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

    /* get 请求 */
    let params = querystring.stringify({
        name: "ccc",
        age: 28,
        by: "http.request",
        method: "get"
    });
    const client_req = http.request({
        protocol: "http:",
        host: '127.0.0.1',
        port: 3000,
        path: "/data" + "?" + params,
        method: 'GET'
    }, client_res => { // response <http.IncomingMessage>
        console.log(`statusCode: ${client_res.statusCode}`)
        let data = "";
        client_res.on('data', chunk => {
            data += chunk;
            console.log(process.stdout.write(chunk))
        });
        client_res.on('end', chunk => {
            server_res.send(data);
        })
    })
    client_req.on('error', error => {
        server_res.send(error.message);
    })
    client_req.end()
    /* get 请求完毕 */
});


/* post formData 请求 */
app.get("/formData", function (req, res) {
    let server_res = res;

    const data = querystring.stringify({
        name: "ccc",
        age: 28,
        by: "http.request",
        method: "post"
    }); // 和 JSON 区别

    const client_req = http.request({
        protocol: "http:",
        host: '127.0.0.1',
        port: 3000,
        path: "/data",
        method: 'POST',
        headers: { // 和 JSON 区别
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        }
    }, client_res => {
        console.log(`statusCode: ${client_res.statusCode}`)
        let data = "";
        client_res.on('data', chunk => {
            data += chunk;
            console.log(process.stdout.write(chunk))
        })
        client_res.on('end', chunk => {
            server_res.send(data);
        })
    })
    client_req.on('error', error => {
        server_res.send(error.message);
    })
    client_req.write(data)
    client_req.end()

});


/* post json 请求 */
app.get("/json", function (req, res) {
    let server_res = res;

    const data = JSON.stringify({
        name: "ccc",
        age: 28,
        by: "http.request",
        method: "post"
    })

    const client_req = http.request({
        protocol: "http:",
        host: '127.0.0.1',
        port: 3000,
        path: "/data",
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    }, client_res => {
        console.log(`statusCode: ${client_res.statusCode}`)
        let data = "";
        client_res.on('data', chunk => {
            data += chunk;
            console.log(process.stdout.write(chunk))
        })
        client_res.on('end', chunk => {
            server_res.send(data);
        })
    })
    client_req.on('error', error => {
        server_res.send(error.message);
    })
    client_req.write(data)
    client_req.end()

});

/* 页面提示 */
app.get("/:path", function (req, res) {
    res.send("请加上 \"/get\" 或者 \"/json\" \"/formData\" 路径，现在路径为: \"/" + req.params.path + "\"");
})
app.get("/", function (req, res) {
    res.send("请加上 \"/get\" 或者 \"/json\" \"/formData\" 路径");
})

app.listen(7008);